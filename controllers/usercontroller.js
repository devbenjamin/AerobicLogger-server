var express = require('express')
var router = express.Router() 
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//Create User Endpoint
router.post('/createuser', function (req, res) {
    let email = req.body.email;
    let pass = req.body.passwordHash;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: bcrypt.hashSync(pass, 10)
    }).then(
        createSuccess = user => {
            
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created', 
                sessionToken: token 
            })
        }
    )
    .catch(err=> res.send(err))
});

router.post('/signin', function(req, res) { 
    User.findOne( { where: { email: req.body.email } } ).then( 
        user => {
        if (user) { 
            bcrypt.compare(req.body.passwordHash, user.passwordHash, (err, matches)=>{ 
                if (matches) { 
                    var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}) 
                    res.json({ 
                        user: user,
                        message: "SUCCESSFULLY AUTHENTICATED",
                        sessionToken: token
                    })
                }else { 
                    res.status(502).send({ error: "YOU FAILED, YO! BOO!!! (502)" })
                }
            })
        }else { 
            res.status(500).send({ error: "FAILED TO AUTHENTICATE (500)" })
        }
    },
        function(err) {
            res.status(501).send({ error: "YOU FAILED, YO!!! (501)" });
        }
    );
});

router.get('/getAll', function(req, res){
  User
  .findAll({
    attributes: [ 'firstName', 'lastName', 'email', 'passwordHash']
  })
  .then(
    function findAllSuccess(data) {
      console.log("Controller data:", data);
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

module.exports = router;


var express = require('express')
var router = express.Router() 
var sequelize = require('../db');
let Slogan = sequelize.import('../models/slogan');

// router.post('/slogan', function (req, res) {
// let sloganData = req.body.slogandata.item;



router.get('/get', function (req, res) {
  let newTitle = req.body.title;
  res.send('hi from slogan')
  Slogan
    .findOne({
      title: newTitle
    })
    .then(
      function createSuccess(title) {
        res.json({
          title: title
        })
      },
      function createError(err) {
        res.send(500, err.message)
      }
    )
})

router.post('/create', function (req, res) {
  let newTitle = req.body.title;
  res.send('hi from slogan')
  Slogan
    .create({
      title: newTitle
    })
    .then(
      function createSuccess(title) {
        res.json({
          title: title
        })
      },
      function createError(err) {
        res.send(500, err.message)
      }
    )
})

router.get('/getAll', function(req, res){
  Slogan
  .findAll({
    attributes: [ 'title', 'id']

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

router.delete('/delete/:id', function(req, res){
	var dataID = req.params.id;

	Slogan.destroy({ where: {id: dataID }}).then(
		function deleteLogSuccess(data){
			res.send("Slogan Deleted");
		},
		function deleteLogError(err){
			res.send(500, err.message)
		}
	)
})

router.get('/:id', function(req, res) {
  Slogan
  .findOne({ where: { id: req.params.id }})
      .then(slogan => res.status(200).json(slogan))
      .catch(err => res.status(500).json({ error: err }))
})

router.put('/update/:id', (req, res) => {
  if(!req.errors) {
    Slogan.update(req.body.slogan, {where: {id: req.params.id}})
      .then(slogan => res.status(200).json(slogan))
      .catch(err => res.status(500).json({ error: err }))
  } else {
    res.status(500).json(req.errors)
  }
})



// router.post('/slogannnnn', function (req, res) {
//   let testData = req.body.testdata.item;

//   TestModel
//     .create({
//       testdata: testData
//     })
//     .then(
//       function createSuccess(testdata) {
//         res.json({
//           testdata: testdata
//         })
//       },
//       function createError(err) {
//         res.send(500, err.message)
//       }
//     )
// })

module.exports = router;




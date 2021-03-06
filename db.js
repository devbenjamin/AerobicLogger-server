require ('dotenv').config()
const Sequelize = require('sequelize'); //Import the Sequelize package

const sequelize = new Sequelize('aerobiclog', 'postgres', process.env.PASS, { 
  host: 'localhost',
  dialect: 'postgres' 
})

sequelize.authenticate().then( 
    function() { //fire a function that shows we are connected
        console.log('Connected to aerobiclog postgres database');
    },
    function(err) { //fire an error if there are any errors
        console.log(err);
    }
);



module.exports = sequelize //export the module.

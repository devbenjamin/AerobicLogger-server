require('dotenv').config();

const express = require('express');
const app = express();
const user = require('./controllers/usercontroller')
const sequelize = require('./db')
const bodyParser = require('body-parser')
const slogan = require('./controllers/slogancontroller')
// const sessionDataModel = require('./models/sessionData')
// const sloganModel = require('./models/slogan')
// const userModel = require('./models/user')
const sessiondata = require('./controllers/sessiondatacontroller')
const port = 3000
// const sessionData = sessionDataModel(sequelize, Sequelize) 
// const slogan = sloganModel(sequelize, Sequelize)
// const user = userModel(sequelize, Sequelize)

app.use(bodyParser.json())
app.use(require('./middleware/headers'))
app.use('/slogan', slogan)
app.use('/user', user)
app.use('/sessiondata', sessiondata)


// sequelize.sync({ force:true })
sequelize.sync()
// sessionData.belongsTo(user) // all session data belongs to a user

// slogan.belongsTo(sessionData) // all slogans belong to a session because a session needs access to all the slogans

// user.hasMany(sessionData) // user has multiple sessions
// slogan.belongsToMany(user, {through: 'sessionData'}) // users have access to slogans, only through sessionDta, because a user never needs slogans ERXCEPT in sessions

//sessionData.hasMany(slogan) 


// app.use(require('./middleware/validate-session'))

 app.listen(port, function() {
  console.log(`You got this, Ben. App is listening on ${port}.`);
});
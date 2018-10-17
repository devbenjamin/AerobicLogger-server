let express = require('express')
let router = express.Router()
let sequelize = require('../db');
let Sessiondata = sequelize.import('../models/sessiondata');

router.post('/', (req, res) => {
    if (!req.errors) {
        const sessionDataRequest = {
            startTime: req.body.timeIn,
            finishTime: req.body.timeOut,
            totalTime: req.body.totalTime,
            resistance: req.body.resistance,
            elevation: req.body.elevation,
            mhr: req.body.calories,
            weight: req.body.weight,
            user_: req.body.user_id,
            slogan_id: req.body.slogan_id
        }

        Sessiondata.create(sessionDataRequest)
            .then(sessionData => res.status(200).json(sessionData))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})



const mongoose = require('mongoose')
const User = require('../../models/user')


function getUser(req, res, next) {

    let id = req.params.userId
    User.findById(id)
        .exec()
        .then(userDoc => {
            res.status(200).json(userDoc)
        })
        .catch(err => {
            res.status(500).json(err)
        });
}

module.exports = {
    getUser: getUser
}
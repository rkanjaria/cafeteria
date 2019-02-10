const mongoose = require('mongoose')
const User = require('../../models/user')

function postUser(req, res, next) {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        userId: req.body.userId,
        password: req.body.password,
    })
    user.save()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({error : err})
        });
}

module.exports = {
    postUser: postUser
}
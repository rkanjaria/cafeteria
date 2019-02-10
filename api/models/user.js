const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: String,
    lname: String,
    userId: String,
    password: String,
    profilePic: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema)
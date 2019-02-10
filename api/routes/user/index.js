const express = require('express');
const router = express.Router();
const get = require('./get')
const post = require('./post')


//GET routes for user
router.get('/:userId', get.getUser);

//POST routes for user
router.post('/', post.postUser)

module.exports = router;

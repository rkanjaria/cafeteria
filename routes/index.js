var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test')
var Schema = mongoose.Schema

var UserDataSchema = new Schema({
  fname: { type: String, required: true },
  lname: String,
  email: String,
  age: Number
}, { collection: 'user'})

var UserData = mongoose.model('UserData', UserDataSchema)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'User' });
});

router.get('/updateUser', function (req, res, next) {
  res.render('updateUser', { title: 'Update user' })
})

router.get('/deleteUser', function (req, res, next) {
  res.render('deleteUser', { title: 'Delete user' })
})

router.post('/insert', function (req, res, next) {
  var data = new UserData({
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    age : req.body.age
  })
  data.save()
  res.redirect('/')

})

router.get('/get', function (req, res, next) {
  UserData.find()
    .then(function(doc){
      res.send(doc)
    })
})

router.post('/update', function (req, res, next) {

  var id = req.body.id
  UserData.findById(id, function(err, doc){
    if(err){
      console.log("No entry found")
    }
    doc.fname = req.body.fname
    doc.lname = req.body.lname
    doc.email = req.body.email
    doc.age = req.body.age
    doc.save()
    res.redirect('/updateUser')
  })

})

router.post('/delete', function (req, res, next) {
  UserData.findByIdAndRemove(req.body.id).exec()
  res.redirect('/deleteUser')
})

module.exports = router;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api/routes/user/index');

var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var mongoose = require('mongoose');

mongoose.connect("mongodb://RK:rk1994@cafecluster-shard-00-00-jlnc8.mongodb.net:27017,cafecluster-shard-00-01-jlnc8.mongodb.net:27017,cafecluster-shard-00-02-jlnc8.mongodb.net:27017/test?ssl=true&replicaSet=CafeCluster-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

var app = express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }))
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(expressValidator())
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var portofolioRouter = require('./routes/portofolios');
var workExperienceRouter = require('./routes/workExperiences');
var educationController = require('./routes/educations');
var profileController = require('./routes/profiles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/portofolio', portofolioRouter);
app.use('/api/work-experience', workExperienceRouter);
app.use('/api/education', educationController);
app.use('/api/profile', profileController);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.listen(3200, ()=>{
  console.log('Server aktif @port 3200')
})

module.exports = app;

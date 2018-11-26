var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var shortedURLrouter = require('./routes/shortedUrls');
var urlRedirectRouter = require('./routes/redirectURLS');

var app = express();

// view engine setup
app.engine('hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/shorted_urls', shortedURLrouter);
app.use('/', urlRedirectRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth/index');
var bookStoreRouter = require('./routes/book-store/index');
var googleApiRouter = require('./routes/google-api/index');
var hendleError = require('./middleware/hendle-error');
var guard = require('./middleware/auth/guard');
require("dotenv").config()

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SIGN));
app.use(express.static(path.join(__dirname, 'public')));
app.use(guard);
app.use('/auth/', authRouter);
app.use('/book/', bookStoreRouter);
app.use('/google-api/', googleApiRouter);
app.use(hendleError);

module.exports = app;

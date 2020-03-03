//packages required
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql2');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var validator = require('validator');

// Initializing App
var app = express();

//Initializing Cookie Parser
app.use(cookieParser());

// Setting up Session vars, will be evenutally moved to its own export
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//Setting Up bodparser inside of app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded());

//setting up handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.locals.nav = GLOBALS.nav_items();

//ROUTING

//Home Page
app.get('/', function (req, res) {
  res.render('home', {
  });
});

//404 Error Page
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

//500 Error Page
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render('500');
});

//Start Server
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

'use strict';

const express = require('express'),
  // request = require('request'),
  bodyParser = require('body-parser');
// ejs = require('ejs');

// Variable for the hostname and port that the server is listening on
const hostName = 'localhost',
  port = 8080;

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const app = express(),
  router = express.Router();

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

router.get('/', (req, res) => {
  res.render('index', { pagename: 'Home' }); // views/index.ejs
});

router.get('/about', (req, res) => {
  res.render('about', { pagename: 'About' }); // views/about.ejs
});

router.post('/login', (req, res) => {
  const errors = [];

  if (!req.body.email) errors.push('Email is required.');
  if (!req.body.password) errors.push('Password is required');
  if (!emailRegex.test(req.body.email)) errors.push('Email is not valid.');
  if (!passwordRegex.test(req.body.password))
    errors.push('Password is not valid.');

  res.render('index', { pagename: 'Home', errors: errors }); // views/index.ejs
});

app.use(express.static('public'));
app.use('/', router);
const server = app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});

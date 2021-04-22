'use strict';

const express = require('express');
// request = require('request'),
// bodyParser = require('body-parser');
// ejs = require('ejs');

// Variable for the hostname and port that the server is listening on
const hostName = 'localhost',
  port = 8080;

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/,
  cityStateRegex = /^[a-zA-Z0-9\s,]{3,}$/,
  zipRegex = /^(\d{5}(?:\-\d{4})?)$/;

const app = express(),
  router = express.Router();

app.use(express.json(), express.urlencoded());
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

  // Deconstruct the req.body object to make code easier to read
  const { email, password } = req.body;

  // Check for blank fields and push an error message if blank
  // else Validate input using regex and push an error message if not valid
  if (!email) errors.push('Email is required.');
  else if (!emailRegex.test(email)) errors.push('Email is not valid.');

  if (!password) errors.push('Password is required');
  else if (!passwordRegex.test(password)) errors.push('Password is not valid.');

  res.render('index', { pagename: 'Home', errors: errors });
});

router.post('/register', (req, res) => {
  let success;
  const errors = [];

  // Deconstruct the req.body object to make code easier to read
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    age,
    consent,
  } = req.body;

  // Check for blank fields and if not blank validate them, push to the errors array for any blank/invalid fields
  if (!firstName) errors.push('First name is required.');
  else if (!nameRegex.test(firstName)) errors.push('First name is not valid.');

  if (!lastName) errors.push('Last name is required.');
  else if (!nameRegex.test(lastName)) errors.push('Last name is not valid');

  if (!address) errors.push('Address is required.');
  else if (!addressRegex.test(address)) errors.push('Address is not valid.');

  if (!city) errors.push('City is required.');
  else if (!cityStateRegex.test(city)) errors.push('City is not valid.');

  if (!state) errors.push('State is required.');
  else if (!cityStateRegex.test(state)) errors.push('State is not valid.');

  if (!zip) errors.push('Zip code is required.');
  else if (!zipRegex.test(zip)) errors.push('Zip is not valid.');

  if (!age) errors.push('Age is required.');
  // if (!req.body.genderRadio) errors.push('Gender is required.') //? Not needed as it is a radio input
  if (!consent) errors.push('You must agree to the terms and conditions.');

  // If there are no errors set a success message
  if (errors.length === 0) success = 'Registration successfully completed!';

  res.render('index', { pagename: 'Home', errors: errors, success: success });
});

app.use(express.static('public'));
app.use('/', router);
const server = app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});

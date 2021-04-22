'use strict';

const express = require('express'),
  session = require('express-session'),
  app = express(),
  router = express.Router();

// Variable for the hostname and port that the server is listening on
const hostName = 'localhost',
  port = 8080;

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/,
  nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/,
  cityStateRegex = /^[a-zA-Z0-9\s,]{3,}$/,
  zipRegex = /^(\d{5}(?:\-\d{4})?)$/;

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  express.static('public'),
  session({ secret: 'secret', saveUninitialized: true, resave: true })
);
app.use('/', router);
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

// Initialize a variable to be used with session.
let sess;

// Route to home page
router.get('/', (req, res) => {
  sess = req.session;
  res.render('index', { pagename: 'Home', sess: sess });
});

// Route to about page
router.get('/about', (req, res) => {
  sess = req.session;
  res.render('about', { pagename: 'About', sess: sess });
});

// Secured route to profile page
router.get('/profile', (req, res) => {
  sess = req.session;
  if (typeof sess == 'undefined' || sess.loggedIn != true) {
    const errors = ['Not an authenticated user'];
    res.render('index', { pagename: 'Home', errors: errors });
  } else {
    res.render('profile', { pagename: 'Profile', sess: sess });
  }
});

// Route for logging out user
router.get('/logout', (req, res) => {
  sess = req.session;
  sess.destroy((err) => {
    res.redirect('/');
  });
});

// Route for logging in user
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

  // check for username and password to match assignment
  // if good show profile page, if not show home page with errors
  if (email == 'mike@aol.com' && password == 'abc123') {
    sess = req.session;

    sess.loggedIn = true;
    session.email = email;
    res.render('profile', { pagename: 'Profile', sess: sess });
  } else {
    errors.push('Invalid login credentials');
    res.render('index', { pagename: 'Home', errors: errors });
  }
});

// Route for registering user
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

  // Render the home page with errors or success message included
  res.render('index', { pagename: 'Home', errors: errors, success: success });
});

const server = app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});

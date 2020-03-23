const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
router.get('/sign-up', forwardAuthenticated, (req, res) => res.render('sign_up'));

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/home',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});

router.post('/sign-up', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/home',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;

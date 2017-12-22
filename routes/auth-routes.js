const express = require('express');
const passport = require('../services/auth/local');
const usersController = require('../controllers/users-controller');

const authRouter = express.Router();

authRouter.post('/register', usersController.create);
authRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/api/auth/verify',
  failureRedirect: '/api/auth/verify',
  failureFlash: true,
}));

authRouter.get('/verify', (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: 'OK',
      auth: true,
      data: {
        user: req.user,
      },
    });
  }
  return res.status(400).json({
    message: 'Login failed',
    auth: false,
    data: {
      user: null,
    },
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({
    message: 'logged out',
    auth: false,
    data: {
      user: null,
    },
  });
});

module.exports = authRouter;

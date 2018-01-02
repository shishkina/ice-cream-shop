const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const User = require('../../models/User');
const authHelpers = require('./auth-helpers');

const options = {};
init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  User.findByUserName(username)
    .then(user => {
      if (!user) done(null, false);
      if (!authHelpers.comparePass(password, user.password_digest)) done(null, false);
      return done(null, user);
    })
    .catch(err => done(err));
}));

module.exports = passport;

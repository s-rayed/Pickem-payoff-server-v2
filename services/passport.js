const passport         = require('passport');
const JwtStrategy      = require('passport-jwt').Strategy;
const ExtractJwt       = require('passport-jwt').ExtractJwt;
const User             = require('../models/user');
const config           = require('../config');
const LocalStrategy    = require('passport-local');

// Local Strategy
const localOptions     = { usernameField: 'email' };
const localLogin       = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, user);
      return done(null, user);
    });
  });
});

// JwtStrategy options - telling it where to find the jwt and use the secret

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Making JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);
    if (user) {
      done(null, user);
    } else {
      done(null, false); // not error because user not fount. its some other weird reason.
    }
  });
})

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
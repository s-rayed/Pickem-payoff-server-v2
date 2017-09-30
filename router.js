const Authentication          = require('./controllers/authentication');
const passportService         = require('./services/passport');
const passport                = require('passport');
const requireAuth             = passport.authenticate('jwt', { session: false });
// passport creates session by default. were using tokens homie, don't need that shit.
const requireSignin           = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.send(['something', 'this', 'that']);
  // });
  app.post('/signup', Authentication.signup);
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
}
const Authentication = require('./controllers/authentication');
module.exports = function(app) {
  // app.get('/', function(req, res, next) {
  //   res.send(['something', 'this', 'that']);
  // });
  app.post('/signup', Authentication.signup);
}
const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;

// Define the model
const userSchema      = new Schema({
  email: type: String, unique: true, lowerCase: true;
  password: String
});

// On save hook, encrypt password
// BEFORE saving a model, run this function -- generate a salt, pass a callback
// hash password using the salt and pass another callback
// overwrite plain text password with new encrypted password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});



// Model class
const ModelClass     = mongoose.model('user', userSchema);

// Export the model class
module.exports = ModelClass;
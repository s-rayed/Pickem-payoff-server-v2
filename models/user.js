const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;

// Define the model
const userSchema      = new Schema({
  email: type: String, unique: true, lowerCase: true;
  password: String
});

// Model class
const ModelClass     = mongoose.model('user', userSchema);

// Export the model class
module.exports = ModelClass;
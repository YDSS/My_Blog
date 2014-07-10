//var mongodb = require('./db');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
      name: { type: String, index: true, unique: true },
      password: String,
      email: String,
      date_register: { type: Date, default: Date.now },
      type: String //admin or normal user
    });

userSchema.statics.get = function(username, callback) {
  this.findOne({ name: username })
      .select('name password')
      .exec(function(err, user) {
        if (err) return callback(err);
        //return user
        return callback(err, user);
      });
};

userSchema.methods.createUser = function(callback) {
  this.save(function(err, user) {
    if (err) return callback(err);
    return callback(err);
  });
};

User =  mongoose.model('users', userSchema);
module.exports = User;

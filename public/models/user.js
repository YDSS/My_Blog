var mongoose = require('mongoose'),
    Db = require('../system/connectMongo.js'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
      name: { type: String, index: true, unique: true },
      password: String,
      email: String,
      date_register: { type: Date, default: Date.now },
      type: String //admin or normal user
    });

userSchema.statics.get = function(username, callback) {
  debugger;
  this.findOne({ name: username })
      .select('name password')
      .exec(function(err, user) {
        if (err) return callback(err);
        debugger;
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

User =  Db.model('users', userSchema);
module.exports = User;

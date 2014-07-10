var mongoose = require('mongoose'),
    Db = require('../system/connectMongo.js'),
    Schema = mongoose.Schema,
    blogSchema = new Schema({
      title: String,
      author: String,
      content: String,
      date: { type: Date, default: Date.now }
    });

blogSchema.methods.write = function write(callback) {
  this.save(function(err, blog) {
    if (err) return callback(err);
    return callback(err, blog);
  });
}

blogSchema.statics.read_all = function read_all(callback) {
  var page_limit = this.limit;
  debugger;
  this.find()
      .select('_id title author content date')
      .limit(page_limit)
      .sort('-date')
      .exec(callback);
};

blogSchema.statics.read_by_id = function read_by_id(id, callback) {
  this.findById(id, 'title content date author')
      .exec(callback);
};

blogSchema.statics.drop_by_id = function drop_by_id(id, callback) {
  this.findByIdAndRemove(id, callback);
};

var Blog = Db.model('blogs', blogSchema);
//blog settings
Blog.limit = 5; //turn page limit for blog home and read module

module.exports = Blog; 

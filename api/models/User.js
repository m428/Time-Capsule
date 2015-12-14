'use strict'
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  fname: {type: String},
  lname: {type: String},
  username: {type: String, required: true, unique: true},
  email: {type: String, requied: true, unique: true},
  password: {type: String, required: true},
  checkins: {type: Number, default: 0},
  caches: [{
    type: mongoose.Schema.Types.ObjectId, // tie caches to user
    ref: 'Cache'
  }]
});

///// schema methods
UserSchema.pre('save', function(next) {
  let currentUser = this;
  if(!currentUser.isModified('password')) return next(); // if password new/modified hash password
  bcrypt.genSalt(5, (err, salt) => { // generate salt
    if (err) return next(err);
    bcrypt.hash(currentUser.password, salt, (err, hash) => { // salt password
      if (err) return next(err);
      currentUser.password = hash;
      next();
    });
  });
}); // end

UserSchema.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) { // compare encrypted passwords
    callback(null, isMatch);
  })
}


module.exports = mongoose.model('User', UserSchema);

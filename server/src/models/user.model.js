const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joined: { type: Date, default: new Date() }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt){
    
  })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

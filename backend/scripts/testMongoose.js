const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
  console.log('pre save triggered, typeof next:', typeof next);
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.log('error in pre save:', err.message);
    next(err);
  }
});

const User = mongoose.model('UserTest', userSchema);

async function run() {
  try {
    const user = new User({ password: 'password123' });
    await user.save();
    console.log('Saved successfully');
  } catch (err) {
    console.error('Save failed:', err.message);
  }
}

run();

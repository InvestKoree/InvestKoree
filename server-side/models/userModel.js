// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['investor', 'founder','admin'] }, 
  phone : { type: String ,required:true},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
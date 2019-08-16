import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  googleId: {type: String}
});

export default mongoose.model('user', UserSchema);

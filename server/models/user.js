import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  googleId: { type: String, required: true },
  feedList: [{ feedId: String, title: String, category: String, readedItem: [String] }]
});

export default mongoose.model('user', UserSchema);

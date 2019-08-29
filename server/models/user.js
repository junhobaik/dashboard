import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  googleId: { type: String, required: true },
  feedList: [{ feedId: String, title: String, category: String, readedItem: [String] }]
});

UserSchema.pre('save', async next => {
  try {
    const user = this;
    console.log('userSchema pre:', user);

    return next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model('user', UserSchema);

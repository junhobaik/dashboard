import mongoose from 'mongoose';

const { Schema } = mongoose;

const FeedSchema = new Schema({
  feedUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

export default mongoose.model('feed', FeedSchema);

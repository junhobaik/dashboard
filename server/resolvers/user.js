/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
import _ from 'lodash';
import { ObjectID } from 'mongodb';

export default {
  Query: {
    users: async (parent, args, { userModel }) => {
      return await userModel.find({}, (err, users) => users);
    },
    user: async (parent, { googleId }, { userModel }) => {
      return await userModel.findOne({ googleId });
    }
  },

  User: {
    feed: async (parent, args, { userModel, feedModel }) => {
      const ids = parent.feedList.map(v => v.feedId);
      return await feedModel.find({ _id: { $in: [...ids] } }, (err, feeds) => feeds);
    }
  }
};

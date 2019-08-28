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
  },

  Mutation: {
    createUser: async (parent, { googleId, name }, { userModel }) => {
      return await userModel.findOne({ googleId }, (err, userData) => {
        if (err) return new Error(err);
        if (!userData) {
          userModel.create({ googleId, name }).then((created, error) => {
            return created;
          });
        }
        return null;
      });
    }
  }
};

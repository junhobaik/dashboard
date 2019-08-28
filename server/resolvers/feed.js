/* eslint-disable no-unused-vars */
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import { ObjectID } from 'mongodb';

export default {
  Query: {
    feeds: async (parent, args, { feedModel }) => {
      return await feedModel.find({}, (err, feeds) => feeds);
    },
    feed: async (parent, { _id }, { feedModel }) => {
      return await feedModel.findOne({ _id: ObjectID(_id) }, (err, feed) => feed);
    }
  }
};

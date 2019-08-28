/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
import _ from 'lodash';

export default {
  Query: {
    users: async (parent, args, { userModel }) => {
      return await userModel.find({}, (err, users) => users);
    },
    user: async (parent, { googleId }, { userModel }) => {
      return await userModel.findOne({ googleId });
    }
  }
};

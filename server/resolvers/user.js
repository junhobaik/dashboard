import _ from 'lodash';

export default {
  Query: {
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    user: (parent, { _id }, { models }) => {
      return models.users[_id];
    },
    admin: (parent, args, { admin }) => {
      return admin;
    }
  },

  User: {
    feeds: (user, args, { models }) => {
      return _.filter(models.feeds, feed => _.indexOf(user.feedIds, feed._id) > -1);
    }
  }
};

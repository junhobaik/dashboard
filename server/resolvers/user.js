export default {
  Query: {
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    user: (parent, { _id }, { models }) => {
      return models.users[_id];
    },
    me: (parent, args, { me }) => {
      return me;
    },
  },

  User: {
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user._id,
      );
    },
  },
};

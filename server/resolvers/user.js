export default {
  Query: {
    users: async (parent, args, { userModel }) => {
      return await userModel.find({}, (err, users) => users);
    },

    user: async (parent, args, { userModel, user }) => {
      if (user) {
        return await userModel.findOne({ googleId: user.id });
      }
    }
  },

  feedListItem: {
    items: async (parent, args, { feedModel }) => {
      const result = await feedModel.findOne({ _id: parent.feedId }, { items: 1 });
      return result.items;
    }
  }
};

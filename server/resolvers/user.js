/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
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
    link: async (parent, args, { feedModel }) => {
      const result = await feedModel.findOne({ _id: parent.feedId }, { link: 1 });
      return result.link;
    },

    items: async (parent, args, { feedModel }) => {
      const result = await feedModel.findOne({ _id: parent.feedId }, { items: 1 });
      return result.items;
    }
  },

  Mutation: {
    changeCategoryName: async (
      parent,
      { oldCategoryName, newCategoryName },
      { userModel, user }
    ) => {
      const result = await userModel
        .updateMany(
          { googleId: user.id, 'feedList.category': oldCategoryName },
          {
            $set: { 'feedList.$[element].category': newCategoryName }
          },
          { arrayFilters: [{ 'element.category': oldCategoryName }] }
        )
        .then(res => {
          if (res.nModified > 0) return { response: true };
          return { response: false };
        })
        .catch(err => {
          if (err) return { response: false };
        });

      return result;
    }
  }
};

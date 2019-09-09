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
    changeFeedTitle: async (parent, { feedId, title }, { userModel, user }) => {
      console.log(feedId, title);

      const result = await userModel
        .updateOne(
          { googleId: user.id, 'feedList.feedId': feedId },
          {
            $set: {
              'feedList.$.title': title
            }
          },
          (error, update) => {
            // if (update.nModifed) console.log(`${update.nModifed}개 수정`)
          }
        )
        .then(res => {
          return { response: true };
        })
        .catch(err => {
          return { response: false };
        });

      return result;
    },

    deleteCategory: async (parent, { category }, { userModel, user }) => {
      const result = await userModel
        .updateMany(
          { googleId: user.id, 'feedList.category': category },
          {
            $set: { 'feedList.$[element].category': 'root' }
          },
          { arrayFilters: [{ 'element.category': category }] }
        )
        .then(res => {
          return { response: true };
        })
        .catch(err => {
          if (err) return { response: false };
        });

      return result;
    },

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
          return { response: true };
        })
        .catch(err => {
          if (err) return { response: false };
        });

      return result;
    },

    changeFeedCategory: async (parent, { feedId, category }, { userModel, user }) => {
      const result = await userModel
        .updateOne(
          { googleId: user.id, 'feedList.feedId': feedId },
          {
            $set: {
              'feedList.$.category': category
            }
          },
          (error, update) => {
            // if (update.nModifed) console.log(`${update.nModifed}개 수정`)
          }
        )
        .then(res => {
          return { response: true };
        })
        .catch(err => {
          return { response: false };
        });

      return result;
    }
  }
};

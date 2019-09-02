/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
import { ObjectID } from 'mongodb';
import Parser from 'rss-parser';

const getFeed = async url => {
  const parser = new Parser();
  return await parser.parseURL(url);
};

export default {
  Query: {
    feeds: async (parent, args, { feedModel }) => {
      return await feedModel.find({}, (err, feeds) => feeds);
    },

    feed: async (parent, { _id }, { feedModel }) => {
      return await feedModel.findOne({ _id: ObjectID(_id) }, (err, feed) => feed);
    },

    feedsByIds: async (parent, { ids }, { feedModel }) => {
      const result = await feedModel.findOne({ _id: { $in: [...ids] } }, { items: 1 });
      return result.items;
    }
  },

  Mutation: {
    addFeed: async (parent, { url, category }, { userModel, feedModel, user }) => {
      const userUpdate = (feedId, title, category, link) => {
        userModel.updateOne(
          { googleId: user.id, 'feedList.feedId': { $ne: feedId } },
          {
            $push: {
              feedList: {
                feedId,
                title,
                category,
                link
              }
            }
          },
          (error, update) => {
            if (error) console.log(error);
          }
        );
      };

      feedModel.findOne({ feedUrl: url }).then(feedData => {
        if (feedData) {
          const { _id, title, category, link } = feedData;
          userUpdate(_id, title, category, link);
        }

        if (!feedData) {
          getFeed(url).then(feed => {
            const { items, title, pubDate, link } = feed;

            feedModel.create({ feedUrl: url, title, items, pubDate, link }).then(created => {
              userUpdate(created._id, title, category, link);
            });
          });
        }
      });

      return {
        response: true
      };
    }
  }
};

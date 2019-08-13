import uuidv4 from 'uuid/v4';
import _ from 'lodash';

export default {
  Query: {
    feeds: (parent, args, { models }) => {
      return Object.values(models.feeds);
    },
    feed: (parent, { _id }, { models }) => {
      return models.feeds[_id];
    }
  },

  Feed: {
    users: (feed, args, { models }) => {
      return _.filter(models.users, ({ feedIds }) => _.indexOf(feedIds, feed._id) > -1);
    }
  },

  Mutation: {
    createFeed: (parent, { title }, { admin, models }) => {
      const id = uuidv4();
      const feed = {
        _id: id,
        title
      };

      models.feeds[id] = feed;
      models.users[admin._id].feedIds.push(id);

      return feed;
    },

    deleteFeed: (parent, { _id }, { models }) => {
      const { [_id]: feed, ...otherFeeds } = models.feeds;

      if (!feed) {
        return false;
      }

      models.feeds = otherFeeds;

      return true;
    }
  }
};

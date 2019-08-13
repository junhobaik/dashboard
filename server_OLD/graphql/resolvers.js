/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const dummy_users = [
  { _id: 1, name: 'Jhon', feeds: [1, 3] },
  { _id: 2, name: 'Red', feeds: [2, 4] },
  { _id: 3, name: 'Darcy', feeds: [3, 5] }
];
const dummy_feeds = [
  {
    _id: 1,
    title: 'site 1',
    link: '#',
    feedLink: '#'
  },
  {
    _id: 2,
    title: 'site 2',
    link: '#',
    feedLink: '#'
  },
  {
    _id: 3,
    title: 'site 3',
    link: '#',
    feedLink: '#'
  },
  {
    _id: 4,
    title: 'site 4',
    link: '#',
    feedLink: '#'
  },
  {
    _id: 5,
    title: 'site 5',
    link: '#',
    feedLink: '#'
  }
];

const resolvers = {
  Query: {
    users: (p, args, { users }) => {
      console.log(users.find());
      return users.find();
    },
    user: (p, { id }) => dummy_users.find(({ _id }) => id === _id)
  },
  User: {
    feeds: user => {
      const result = [];

      for (const feedId of user.feeds) {
        result.push(
          dummy_feeds.find(v => {
            return feedId === v._id;
          })
        );
      }
      return result;
    }
  }
};

export default resolvers;

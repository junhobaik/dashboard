/* eslint-disable prefer-const */
let users = {
  1: {
    _id: '1',
    name: 'Junho Baik',
    messageIds: [1],
  },
  2: {
    _id: '2',
    name: 'Dave Davids',
    messageIds: [2],
  },
};

let messages = {
  1: {
    _id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    _id: '2',
    text: 'By World',
    userId: '2',
  },
};

export default {
  users,
  messages,
};

import uuidv4 from 'uuid/v4';

export default {
  Query: {
    messages: (parent, args, { models }) => {
      return Object.values(models.messages);
    },
    message: (parent, { _id }, { models }) => {
      return models.messages[_id];
    }
  },

  Message: {
    user: (message, args, { models }) => {
      return models.users[message.userId];
    }
  },

  Mutation: {
    createMessage: (parent, { text }, { admin, models }) => {
      const id = uuidv4();
      const message = {
        _id: id,
        text,
        userId: admin._id
      };

      models.messages[id] = message;
      models.users[admin._id].messageIds.push(id);

      return message;
    },

    deleteMessage: (parent, { _id }, { models }) => {
      const { [_id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return false;
      }

      models.messages = otherMessages;

      return true;
    }
  }
};

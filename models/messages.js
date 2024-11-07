const messages = [
   { text: 'Hi there!', userId: 1, added: new Date() },
   { text: 'Hello World!', userId: 2, added: new Date() },
];
const { users } = require('./users');

async function getMessages() {
   return messages.map((msg) => ({
      ...msg,
      user: users.find((user) => user.id === msg.userId)?.name || 'Unknown',
   }));
}

async function addMessage(text, userId) {
   messages.push({ text, userId, added: new Date() });
}

module.exports = { getMessages, addMessage };

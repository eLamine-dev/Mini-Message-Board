const messages = [
   { text: 'Hi there!', user: 'Amando', added: new Date() },
   { text: 'Hello World!', user: 'Charles', added: new Date() },
];

function getMessages() {
   return messages;
}

function addMessage(text, user) {
   messages.push({ text, user, added: new Date() });
}

module.exports = { getMessages, addMessage };

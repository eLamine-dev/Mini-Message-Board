const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res) {
   const messages = await getMessages();
   res.render('message-board', { title: 'Mini Message Board', messages });
}

async function addNewMessage(req, res) {
   const { text, user } = req.body;
   await addMessage(text, user);
}

module.exports = { getAllMessages, addNewMessage };

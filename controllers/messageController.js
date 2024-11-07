const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res) {
   const messages = await getMessages();
   const userName = req.query.userName;
   res.render('message-board', {
      title: 'Mini Message Board',
      messages,
      userName,
   });
}

async function addNewMessage(req, res) {
   const { messageText, messageUser } = req.body;
   await addMessage(messageText, messageUser);
   res.redirect(`/messages?userName=${encodeURIComponent(messageUser)}`);
}

module.exports = { getAllMessages, addNewMessage };

const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res, next) {
   try {
      const messages = await getMessages();
      const { name: userName, id: userId } = req.session.user || {};

      res.render('message-board', {
         messages,
         userName,
         userId,
      });
   } catch (error) {
      next({ message: 'Error retrieving messages', status: 500, error });
   }
}

async function addNewMessage(req, res, next) {
   try {
      const { messageText } = req.body;
      const { id: userId } = req.session.user;

      if (!messageText || !userId) {
         throw new Error('Message text and userId are required');
      }

      await addMessage(messageText, parseInt(userId));
      res.redirect('/messages');
   } catch (error) {
      next(error);
   }
}

module.exports = { getAllMessages, addNewMessage };

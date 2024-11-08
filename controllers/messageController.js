const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res, next) {
   try {
      const messages = await getMessages();
      const { userName, userId } = req.query;
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
      const { messageText, userId } = req.body;
      const { userName } = req.query;

      if (!messageText || !userId) {
         throw new Error('Message text and userId are required');
      }

      await addMessage(messageText, parseInt(userId));
      res.redirect(
         `/messages?userName=${encodeURIComponent(userName)}&userId=${userId}`
      );
   } catch (error) {
      next(error);
   }
}

module.exports = { getAllMessages, addNewMessage };

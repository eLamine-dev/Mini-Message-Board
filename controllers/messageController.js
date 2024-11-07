// controllers/messageController.js
const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res, next) {
   try {
      const messages = await getMessages();
      const { userName, userId } = req.body;
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

      if (!messageText || !userId) {
         throw new Error('Message text and userId are required');
      }

      addMessage(messageText, parseInt(userId));
      res.redirect(
         `/messages?userName=${encodeURIComponent(
            req.query.userName
         )}&userId=${userName}`,
         {
            userName: req.query.userName,
            userId: userId,
         }
      );
   } catch (error) {
      next(error);
   }
}

module.exports = { getAllMessages, addNewMessage };

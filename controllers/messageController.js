const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res, next) {
   try {
      const messages = await getMessages();
      // const { userName, userId } = req.body;

      const userName = req.session.user.name;
      const userId = req.session.user.id;

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
      const { messageText, userId, userName } = req.body;

      if (!messageText || !userId) {
         throw new Error('Message text and userId are required');
      }

      await addMessage(messageText, parseInt(userId));

      res.redirect('.');
   } catch (error) {
      next(error);
   }
}

module.exports = { getAllMessages, addNewMessage };

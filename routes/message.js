const { Router } = require('express');
const {
   getAllMessages,
   addNewMessage,
} = require('../controllers/messageController');

const messagesRouter = Router();

messagesRouter.get('/', getAllMessages);
messagesRouter.post('/new', addNewMessage);

module.exports = messagesRouter;

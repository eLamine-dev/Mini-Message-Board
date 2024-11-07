const { Router } = require('express');
const { getAllMessages } = require('../controllers/messageController');

const messagesRouter = Router();

messagesRouter.get('/message-board', getAllMessages);

module.exports = messagesRouter;

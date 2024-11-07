const express = require('express');
const {
   getAllMessages,
   addNewMessage,
} = require('../controllers/messageController');

const router = express.Router();

router.get('/', getAllMessages);
router.post('/new', addNewMessage);

module.exports = router;

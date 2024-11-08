const express = require('express');
const router = express.Router();
const { addNewUser } = require('../controllers/userController');
const { getAllMessages } = require('../controllers/messageController');

router.post('/sign-in', addNewUser, getAllMessages);

module.exports = router;

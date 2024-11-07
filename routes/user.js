const express = require('express');
const router = express.Router();
const { addNewUser } = require('../controllers/userController');

router.post('/sign-in', addNewUser);

module.exports = router;

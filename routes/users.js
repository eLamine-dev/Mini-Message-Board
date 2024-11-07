const { Router } = require('express');
const { userController } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/add', () => {
   userController.addUser;
});

module.exports = userRouter;

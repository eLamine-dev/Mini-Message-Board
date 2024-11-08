const { users, addUser } = require('../models/users');

async function addNewUser(req, res, next) {
   try {
      const { userName } = req.body;
      const newUser = { name: userName, id: users.length + 1 };

      addUser(newUser);

      res.redirect(`/messages?userName=${userName}&userId=${newUser.id}`);
   } catch (error) {
      next(error);
   }
}

module.exports = { addNewUser };

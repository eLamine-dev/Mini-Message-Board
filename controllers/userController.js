const { users, addUser } = require('../models/users');

async function addNewUser(req, res, next) {
   try {
      const { userName } = req.body;

      let user = users.find((u) => u.name === userName);

      if (!user) {
         user = { name: userName, id: users.length + 1 };
         addUser(user);
      }

      req.session.user = user;
      res.redirect('/messages');
   } catch (error) {
      next(error);
   }
}

module.exports = { addNewUser };

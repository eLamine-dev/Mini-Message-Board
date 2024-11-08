const { users, addUser } = require('../models/users');

async function addNewUser(req, res, next) {
   try {
      const { userName } = req.body;

      const existingUser = users.find((user) => user.name === userName);

      if (existingUser) {
         req.session.user = existingUser;
         // req.body.userId = existingUser.id;
         // req.body.userName = existingUser.name;
      } else {
         const newUser = { name: userName, id: users.length + 1 };
         req.session.user = newUser;
         // req.body.userId = newUser.id;
         // req.body.userName = newUser.name;
         addUser(newUser);
      }

      res.redirect('/messages');

      // next();
   } catch (error) {
      next(error);
   }
}

module.exports = { addNewUser };

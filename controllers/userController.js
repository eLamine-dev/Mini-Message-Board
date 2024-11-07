const { users, addUser } = require('../models/users');

async function addNewUser(req, res) {
   const { userName } = req.body;
   const newUser = { name: userName, id: users.length + 1 };
   await addUser(newUser);
   res.redirect(`/messages`, { userName: userName, userId: newUser.id });
}

module.exports = { addNewUser };

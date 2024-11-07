const { addUser } = require('../models/users');

async function addNewUser(req, res) {
   const { id, user } = req.body;
   await addUser(text, user);
}

module.exports = { addNewUser };

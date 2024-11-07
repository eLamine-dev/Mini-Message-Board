const { addUser } = require('../models/users');

async function addNewUser(req, res) {
   const { userName } = req.body;
   await addUser({ id: Date.now(), name: userName });
   res.redirect(`/messages?userName=${encodeURIComponent(userName)}`);
}

module.exports = { addNewUser };

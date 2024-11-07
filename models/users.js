const users = [];

function addUser(userName) {
   users.push({ name: userName, id: users.length + 1 });
}

module.exports = { addUser };

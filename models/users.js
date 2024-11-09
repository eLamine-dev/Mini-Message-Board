const users = [
   { name: 'John', id: 1 },
   { name: 'Jane', id: 2 },
];

function addUser(user) {
   users.push(user);
}

module.exports = { users, addUser };

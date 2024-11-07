const users = [
   { name: 'John', id: 1 },
   { name: 'Jane', id: 2 },
];

function addUser(user) {
   users.push(user);
   console.log(users);
}

module.exports = { users, addUser };

const users = [
   {
      id: 1,
      name: 'ryan',
   },
   {
      id: 2,
      name: 'luis',
   },
];

function addUser(user) {
   users.push(user);
}

module.exports = { addUser };

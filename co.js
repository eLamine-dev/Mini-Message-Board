// app.js
const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/user', userRouter);
// app.use('/message', messageRouter);

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
   console.log(`Server is running on http://localhost:${PORT}`)
);

// controllers/messageController.js
const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res) {
   const messages = await getMessages();
   res.render('message-board', { title: 'Mini Message Board', messages });
}

async function addNewMessage(req, res) {
   const { text, user } = req.body;
   await addMessage(text, user);
}

module.exports = { getAllMessages, addNewMessage };

// controllers/userController.js
const { addUser } = require('../models/user');

async function addNewUser(req, res) {
   const { id, user } = req.body;
   await addUser(text, user);
}

module.exports = { addNewUser };

// models/messages.js
const messages = [
   { text: 'Hi there!', user: 'Amando', added: new Date() },
   { text: 'Hello World!', user: 'Charles', added: new Date() },
];

function getMessages() {
   return messages;
}

function addMessage(text, user) {
   messages.push({ text, user, added: new Date() });
}

module.exports = { getMessages, addMessage };

// models/users.js
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

// public/style.css


// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('index', {
      title: 'Mini Message Board',
   });
});

module.exports = router;

// routes/message.js
const { Router } = require('express');
const { getAllMessages } = require('../controllers/messageController');

const messagesRouter = Router();

messagesRouter.get('/message-board', getAllMessages);

module.exports = messagesRouter;

// routes/users.js
const { Router } = require('express');
const { userController } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/add', () => {
   userController.addUser;
});

module.exports = userRouter;

// views/_form.ejs
<div class="new-message-form">
   <form method="POST" action="/new">
      <input type="text" name="messageUser" placeholder="Your Name" required />
      <textarea
         name="messageText"
         placeholder="Type your message here"
         required
      ></textarea>
      <button type="submit">Send Message</button>
   </form>
</div>

// views/index.ejs
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title><%= title %></title>
      <link rel="stylesheet" href="/styles.css" />
   </head>
   <body>
      <div class="container">
         <h1>Sign Up</h1>
         <form action="/sign-in" method="POST">
            <label for="userName">Enter your name:</label>
            <input type="text" id="userName" name="userName" required />
            <button type="submit">Enter Message Board</button>
         </form>
      </div>
   </body>
</html>

// views/message-board.ejs
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title><%= title %></title>
      <link rel="stylesheet" href="/styles.css" />
   </head>
   <body>
      <div class="container">
         <h1>Message Board</h1>
         <h2>Welcome, <%= userName %>!</h2>

         <!-- Message List -->
         <div class="messages">
            <% messages.forEach(message => { %>
            <div class="message">
               <p><strong><%= message.user %>:</strong> <%= message.text %></p>
               <span><%= message.added.toLocaleString() %></span>
            </div>
            <% }) %>
         </div>

         <!-- New Message Form -->
         <div class="new-message-form">
            <h3>Add a new message</h3>
            <form action="/messages/new" method="POST">
               <input
                  type="hidden"
                  name="messageUser"
                  value="<%= userName %>"
               />
               <label for="messageText">Your Message:</label>
               <textarea
                  id="messageText"
                  name="messageText"
                  required
               ></textarea>
               <button type="submit">Post Message</button>
            </form>
         </div>
      </div>
   </body>
</html>


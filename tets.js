const { getMessages, addMessage } = require('../models/messages');

async function getAllMessages(req, res, next) {
   try {
      const messages = await getMessages();
      const { userName, userId } = req.query;
      res.render('message-board', {
         messages,
         userName,
         userId,
      });
   } catch (error) {
      next({ message: 'Error retrieving messages', status: 500, error });
   }
}

async function addNewMessage(req, res, next) {
   try {
      const { messageText, userId } = req.body;
      const { userName } = req.query;

      if (!messageText || !userId) {
         throw new Error('Message text and userId are required');
      }

      await addMessage(messageText, parseInt(userId));
      res.redirect(
         `/messages?userName=${encodeURIComponent(userName)}&userId=${userId}`
      );
   } catch (error) {
      next(error);
   }
}

module.exports = { getAllMessages, addNewMessage };

const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const messagesRouter = require('./routes/message');
const usersRouter = require('./routes/user');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);

<!-- views/message-board.ejs -->
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mini Message Board</title>
      <link rel="stylesheet" href="/style.css" />
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
               <input type="hidden" name="userId" value="<%= userId %>" />
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

<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mini Message Board</title>
      <link rel="stylesheet" href="/style.css" />
   </head>
   <body>
      <div class="container">
         <h1>Sign Up</h1>
         <form action="/users/sign-in" method="POST">
            <label for="userName">Enter your name:</label>
            <input type="text" id="userName" name="userName" required />
            <button type="submit">Enter Message Board</button>
         </form>
      </div>
   </body>
</html>

const express = require('express');
const router = express.Router();
const { addNewUser } = require('../controllers/userController');

router.post('/sign-in', addNewUser);

module.exports = router;

const express = require('express');
const {
   getAllMessages,
   addNewMessage,
} = require('../controllers/messageController');

const router = express.Router();

router.get('/', getAllMessages);
router.post('/new', addNewMessage);

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('index', { title: 'Mini Message Board' });
});

module.exports = router;

/* public/styles.css */
body {
   font-family: Arial, sans-serif;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   margin: 0;
   background-color: #f0f0f5;
}

.container {
   width: 100%;
   max-width: 450px;
   background-color: #ffffff;
   border-radius: 12px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   display: flex;
   flex-direction: column;
   overflow: hidden;
}

h1,
h2 {
   text-align: center;
   padding: 10px;
   background-color: #0078d7;
   color: white;
   margin: 0;
}

.messages {
   padding: 10px;
   flex: 1;
   overflow-y: auto;
   display: flex;
   flex-direction: column;
   gap: 10px;
   background-color: #e5e7eb;
}

.message {
   max-width: 70%;
   padding: 8px 12px;
   border-radius: 10px;
   background-color: #dcf8c6;
   align-self: flex-start;
}

.message .timestamp {
   font-size: 0.75em;
   color: #555;
   text-align: right;
   margin-top: 5px;
}

.new-message-form {
   display: flex;
   padding: 10px;
   background-color: #f0f0f5;
   border-top: 1px solid #ddd;
}

.new-message-form textarea {
   flex: 1;
   padding: 8px;
   border-radius: 5px;
   border: 1px solid #ddd;
   resize: none;
}

.new-message-form button {
   margin-left: 10px;
   padding: 10px 15px;
   border: none;
   color: white;
   background-color: #0078d7;
   border-radius: 5px;
   cursor: pointer;
}

const users = [
   { name: 'John', id: 1 },
   { name: 'Jane', id: 2 },
];

function addUser(user) {
   users.push(user);
   console.log(users);
}

module.exports = { users, addUser };

const messages = [
   { text: 'Hi there!', userId: 1, added: new Date() },
   { text: 'Hello World!', userId: 2, added: new Date() },
];
const { users } = require('./users');

async function getMessages() {
   return messages.map((msg) => ({
      ...msg,
      user: users.find((user) => user.id === msg.userId)?.name || 'Unknown',
   }));
}

async function addMessage(text, userId) {
   messages.push({ text, userId, added: new Date() });
}

module.exports = { getMessages, addMessage };

function notFound(req, res, next) {
   const error = new Error(`Not Found - ${req.originalUrl}`);
   res.status(404);
   next(error);
}

function errorHandler(err, req, res, next) {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err : {},
   });
}

module.exports = { notFound, errorHandler };

const { users, addUser } = require('../models/users');

async function addNewUser(req, res, next) {
   try {
      const { userName } = req.body;
      const newUser = { name: userName, id: users.length + 1 };

      addUser(newUser);

      res.redirect(`/messages?userName=${userName}&userId=${newUser.id}`);
   } catch (error) {
      next(error);
   }
}

module.exports = { addNewUser };


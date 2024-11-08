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
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
);

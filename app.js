const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/messages', messageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
   console.log(`Server is running on http://localhost:${PORT}`)
);

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

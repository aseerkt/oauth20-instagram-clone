const express = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const cookieSession = require('cookie-session');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Load vars
require('dotenv').config();

// Connect to DB
require('./config/db')();

// Passport config
require('./config/passport')(passport);

const app = express();
app.use(helmet());
app.use(logger('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);
app.use(fileUpload({ createParentPath: true }));
app.use(cookieParser());
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false,
//     cookie: { maxAge: 8 * 60 * 60 * 1000 },
//   })
// );

app.use(
  cookieSession({
    name: 'sessID',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Use Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/likes', require('./routes/likes'));
app.use('/api/follow', require('./routes/follows'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const icecreamRoutes = require('./routes/icecream-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  key: process.env.SECRET_KEY,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use('/api/icecream', icecreamRoutes);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res) => {
  res.status(500).json({
    error: err,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${app.get('env')}`);
});

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const userRoutes = require('../src/routes/user.route');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || 'Internal error in expense';
  return req.status(status).json(error);
});
mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Connected to ${process.env.MONGO_URL}`);
  })
  .catch(err => console.log(`Error on Connecting to ${process.env.MONGO_URL}`));

module.exports = app;

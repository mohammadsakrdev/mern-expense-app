const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const express = require("express");
const app = express();
const morgan = require("morgan");

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send();
})

module.exports = app;

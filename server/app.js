const express = require("express");
const app = express();
const morgan = require("morgan");

const PORT = 4000;

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`< SERVER - ON / PORT=${PORT}`);
  console.log();
});

module.exports = app;

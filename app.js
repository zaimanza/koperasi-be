const express = require("express")
require("dotenv").config();
var cors = require('cors')
const app = express()
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({
  extended: true,
  limit: '2000mb',
  parameterLimit: 10000000000
}));
app.use(bodyParser.json({ limit: '2000mb' }));
app.use(cors())
app.use(require("./middleware/token/decode.token"))

// Routes which should handle requests
app.use("/", require("./controllers"))

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

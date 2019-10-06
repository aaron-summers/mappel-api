const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//temp
// const bcrypt = require('bcryptjs');

dotenv.config();
const port = process.env.port || 3000;

//route files
const auth = require('../routes/auth');
const users = require('../routes/users');
const boards = require('../routes/boards');

//middleware
app.use(
  cors({
    origin: ["http://localhost:5050"],
    exposedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
  })
);
//json parse
app.use(express.json());

//db connection
mongoose.connect(
  `${process.env.DB_URL}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to database");
  }
);

//routes
app.use('/', auth);
app.use('/', users);
app.use('/', boards);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
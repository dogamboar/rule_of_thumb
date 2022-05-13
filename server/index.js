const express = require("express");
const path = require('path')
const bodyParser = require('body-parser')

const candidatesRoutes = require('./routes/candidates')
const voteRoutes = require('./routes/vote')

const app = express(); // create express app

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use("/candidates", candidatesRoutes);
app.use("/vote", voteRoutes);

app.get("/admin", (req, res) => {
  res.send("This is from express.js");
});

// start express server on port 5000
app.listen(3001, () => {
  console.log("server started on port 3001");
});
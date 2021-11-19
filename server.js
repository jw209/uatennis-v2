const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const db = require("./config/keys").mongoURI;

mongoose.connect(
    db,
    { useNewUrlParser: true }
)
.then(() => console.log("Connection successful"))
.catch(err => console.log(err));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
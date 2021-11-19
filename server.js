const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const accounts = require("./routes/api/accounts");

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

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
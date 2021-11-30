const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require('path');

const accounts = require("./routes/api/accounts");
const comments = require("./routes/api/comments");
const players = require("./routes/api/players");
const games = require("./routes/api/games");

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

app.use("/api/accounts", accounts);
app.use("/api/comments", comments);
app.use("/api/players", players);
app.use("/api/games", games);

// Server static assets 
if(process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`))
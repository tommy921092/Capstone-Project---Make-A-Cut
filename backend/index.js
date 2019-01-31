const express = require("express");
const bodyParser = require("body-parser");

// import user from './routes/users';
// import auth from './routes/auth'
// import event from './routes/event'
const user = require("./routes/users");
const auth = require("./routes/auth");
const shop = require("./routes/shop");
const userProfile = require('./routes/userProfile');
const shopProfile = require('./routes/shopProfile');

let app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/users", user);
app.use("/api/auth", auth);
// app.use('/api/events', event)
app.use("/api/userProfile", userProfile);
app.use("/api/shopProfile", shopProfile);
// require("./routes/billing")(app); // for stripe api
app.use("/api/shop", shop);
app.get("/", (req, res) => {
  res.send("Your fucking capstone backend is running la");
});

app.listen(6060, () => {
  console.log("Capstone Backend API server Running on localhost:6060");
});

const express = require("express");
const bodyParser = require("body-parser");

const user = require("./routes/users");
const auth = require("./routes/auth");
const shop = require("./routes/shop");
const userProfile = require('./routes/userProfile');
const shopProfile = require('./routes/shopProfile');
const shopService = require('./routes/shopService');
const search = require('./routes/search');
const menu = require('./routes/menu');
const billing = require('./routes/billing');
const booking = require ('./routes/booking');

let app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/users", user);
app.use("/api/auth", auth);
// app.use('/api/events', event)
app.use("/api/userProfile", userProfile);
app.use("/api/shopProfile", shopProfile);
app.use("/api/shop/service", shopService);
app.use("/api/billing", billing)
app.use("/api/shop", shop);
app.use("/api/search", search);
app.use("/api/menu", menu);
app.use("/api/booking", booking);
app.get("/", (req, res) => {
  res.send("Your fucking capstone backend is running la");
});

app.listen(6060, () => {
  console.log("Capstone Backend API server Running on localhost:6060");
});

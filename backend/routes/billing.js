require("dotenv").config();
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});
const keys = require("../.env");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    //function for actually charge the user
    const charge = await stripe.charges.create({
      amount: 500, // 500 cents = 5usd
      currency: "usd",
      source: req.body.id
    });
    // for mongo DB
    //   req.user.credits += 5;
    //   const user = await req.user.save();
    // do something for knex DB
    res.send(user);
  });
};

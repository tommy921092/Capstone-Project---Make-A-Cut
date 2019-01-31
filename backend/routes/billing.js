require("dotenv").config();
const express = require("express");
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});
const stripe = require("stripe")(process.env.stripeSecretKey);
const authenticate = require('../middlewares/authenticate')
const uuidv4 = require('uuid/v4');

let router = express.Router();

router.post('/', authenticate ,  async (req, res) => {
  if(req.body.stripeToken){
    const token = req.body.stripeToken
    const amount = req.body.amount
    const menuID = req.body.menuid
    const userID = req.currentID
    const shopID = req.body.shopid
    const date = req.body.date
    const time = req.body.time
    const uid = uuidv4();
  
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "HKD",
      source: token
    }).then((paymentResult)=>{

      knex('booking').insert({
        _shopid: shopID,
        _menuid: menuID,
        _userid: userID,
        uid: uid,
        bookingdate: `${date}_${time}`,
        paymentid: paymentResult.id
      })
      .returning('uid')
      .then((row)=>{
        res.status(200).send(row[0])
      }).catch((err)=>{
        console.log(err)
        res.status(404)
      })


    }).catch((err)=>{
      console.log(err)
    });


  } else {
    res.send("Bad request")
  }
})



module.exports = router;

  // app.post("/api/stripe", async (req, res) => {
  //   //function for actually charge the user
  //   const charge = await stripe.charges.create({
  //     amount: 500, // 500 cents = 5usd
  //     currency: "usd",
  //     source: req.body.id
  //   });
  //   // for mongo DB
  //   //   req.user.credits += 5;
  //   //   const user = await req.user.save();
  //   // do something for knex DB
  //   res.send(user);
//   });
// };

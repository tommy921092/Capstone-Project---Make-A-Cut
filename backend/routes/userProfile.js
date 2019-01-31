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

let router = express.Router();

router.get("/profile/:id", (req, res) => {
  let userid = req.params.id;
  knex("users")
    .where({ id: userid })
    .then(rows => {
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/profile/:id", (req, res) => {
  let userid = req.params.id;
  console.log(req.params.id);
  console.log(req.body);
  knex("users")
    .update(req.body)
    .where({ id: userid })
    .then(() => {
      console.log("updated user profile");
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
    });
});

// get upcoming booking records
router.get("/current/:id", (req, res) => {
  let userid = req.params.id;
  knex("booking")
    .select(
      "booking.uid",
      "booking.id",
      "booking._shopid",
      "booking.bookingdate",
      "booking.status",
      "menu.name",
      "menu.price",
      "shop.shopname",
      "shop.address",
      "shop.photo",
      "shop.tel",
      "shop.website"
    )
    .fullOuterJoin("menu", "booking._menuid", "menu.id")
    .fullOuterJoin("shop", "booking._shopid", "shop.id")
    .where({
      "booking._userid": userid
    })
    // .andWhere({
    //   // logic for checking whether the time is future
    // })
    .then(rows => {
      console.log("getting the upcoming records");
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
});

//get previous booking record
router.get("/previous/:id", (req, res) => {
  let userid = req.params.id;
  res.send(userid);
  knex("booking")
    .select(
      "booking.id",
      "booking._shopid",
      "booking.bookingdate",
      "booking.status",
      "menu.name",
      "menu.price",
      "shop.id as shopid",
      "shop.shopname",
      "shop.address",
      "shop.tel",
      "shop.website",
      "comment.id as commentid",
      "comment.rating",
      "comment.content"
    )
    .fullOuterJoin("menu", "booking._menuid", "menu.id")
    .fullOuterJoin("shop", "booking._shopid", "shop.id")
    .fullOuterJoin("comment", "comment._shopid", "shop.id")
    .where({
      "booking._userid": userid
    })
    // .andWhere({
    //   // logic for checking whether the time is future
    // })
    .then(rows => {
      console.log("getting the previous records");
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/booking", (req, res) => {
  knex("booking")
    .insert(req.body)
    .then(() => res.send("BOOKED"))
    .catch(err => console.log(err));
});

module.exports = router;

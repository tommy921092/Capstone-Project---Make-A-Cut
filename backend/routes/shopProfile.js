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

router.get("/:id", (req, res) => {
  let merchantid = req.params.id;
  knex("merchant")
    .select(
      "merchant.email",
      "shop.shopname",
      "shop.address",
      "shop.address_2",
      "shop.tag",
      "shop.pricerange",
      "shop.tel",
      "shop.website",
      "shop.photo",
      "shop.openhour",
      "shop.closehour",
      "shop.restday",
      "shop.description"
    )
    .innerJoin("shop", "merchant.id", "shop._merchantid")
    .where("merchant.id", merchantid)
    .then(rows => {
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
});

//assume shopid = merchantid for easy go, but not the case if you modify the db manually
router.put("/:id", (req, res) => {
  let merchantid = req.params.id;
  console.log(req.params.id);
  console.log(req.body);
  knex("shop")
    .update(req.body)
    .where({ id: merchantid })
    .then(() => {
      console.log("updated shop profile");
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/current/:id", (req, res) => {
  let shopid = req.params.id;
  knex("booking")
    .select(
      "booking.bookingdate",
      "users.tel",
      "users.fullname",
      "menu.name",
      "menu.price",
      "booking.status",
      "booking.uid"
    )
    .fullOuterJoin("users", "booking._userid", "users.id")
    .fullOuterJoin("menu", "booking._menuid", "menu.id")
    .where({ "booking._shopid": shopid })
    .then(rows => {
      console.log("getting the upcoming records");
      res.send(
        rows
          .filter(
            x =>
              new Date(
                x.bookingdate.split("_")[0].split("-")[2],
                x.bookingdate.split("_")[0].split("-")[1] - 1,
                x.bookingdate.split("_")[0].split("-")[0],
                x.bookingdate.split("_")[1].split(":")[0],
                x.bookingdate.split("_")[1].split(":")[1],
                0
              ) >= new Date()
          )
          .sort(function(a, b) {
            //such that the records always show the most recent bookings at the top
            return (
              new Date(
                b.bookingdate.split("_")[0].split("-")[2],
                b.bookingdate.split("_")[0].split("-")[1] - 1,
                b.bookingdate.split("_")[0].split("-")[0],
                b.bookingdate.split("_")[1].split(":")[0],
                b.bookingdate.split("_")[1].split(":")[1],
                0
              ) -
              new Date(
                a.bookingdate.split("_")[0].split("-")[2],
                a.bookingdate.split("_")[0].split("-")[1] - 1,
                a.bookingdate.split("_")[0].split("-")[0],
                a.bookingdate.split("_")[1].split(":")[0],
                a.bookingdate.split("_")[1].split(":")[1],
                0
              )
            );
          })
      );
    })
    .catch(err => console.log(err));
});

router.get("/previous/:id", (req, res) => {
  let shopid = req.params.id;
  knex("booking")
    .select(
      "booking.bookingdate",
      "booking.status",
      "users.tel",
      "users.fullname",
      "menu.name",
      "menu.price"
    )
    .fullOuterJoin("users", "booking._userid", "users.id")
    .fullOuterJoin("menu", "booking._menuid", "menu.id")
    .where({ "booking._shopid": shopid })
    .then(rows => {
      console.log("getting the upcoming records");
      res.send(
        rows
          .filter(
            x =>
              new Date(
                x.bookingdate.split("_")[0].split("-")[2],
                x.bookingdate.split("_")[0].split("-")[1] - 1,
                x.bookingdate.split("_")[0].split("-")[0],
                x.bookingdate.split("_")[1].split(":")[0],
                x.bookingdate.split("_")[1].split(":")[1],
                0
              ) < new Date()
          )
          .sort(function(a, b) {
            //such that the records always show the most recent bookings at the top
            return (
              new Date(
                b.bookingdate.split("_")[0].split("-")[2],
                b.bookingdate.split("_")[0].split("-")[1] - 1,
                b.bookingdate.split("_")[0].split("-")[0],
                b.bookingdate.split("_")[1].split(":")[0],
                b.bookingdate.split("_")[1].split(":")[1],
                0
              ) -
              new Date(
                a.bookingdate.split("_")[0].split("-")[2],
                a.bookingdate.split("_")[0].split("-")[1] - 1,
                a.bookingdate.split("_")[0].split("-")[0],
                a.bookingdate.split("_")[1].split(":")[0],
                a.bookingdate.split("_")[1].split(":")[1],
                0
              )
            );
          })
      );
    })
    .catch(err => console.log(err));
});

module.exports = router;

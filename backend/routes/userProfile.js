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
      "booking.id as _bookingid",
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
    .catch(err => {
      console.log(err);
    });
});

//get previous booking record
router.get("/previous/:id", (req, res) => {
  let userid = req.params.id;
  knex("booking")
    .select(
      "booking.uid",
      "booking.id as _bookingid",
      "booking._shopid",
      "booking._userid",
      "booking.bookingdate",
      "booking.status",
      "menu.name",
      "menu.price",
      "shop.shopname",
      "shop.address",
      "shop.photo",
      "shop.tel",
      "shop.website",
      "comment.id as commentid",
      "comment.rating",
      "comment.content"
    )
    .fullOuterJoin("menu", "booking._menuid", "menu.id")
    .fullOuterJoin("shop", "booking._shopid", "shop.id")
    .fullOuterJoin("comment", "comment._bookingid", "booking.id")
    .where({
      "booking._userid": userid
    })
    .then(rows => {
      console.log("getting the previous records");
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

router.put("/cancelbooking/:id", (req, res) => {
  let bookingid = req.params.id;
  knex("booking")
    .update({ status: "cancelled" })
    .where({ id: bookingid })
    .then(() => res.send("CANCELLED"))
    .catch(err => console.log(err));
});

router.post("/comment", (req, res) => {
  knex("comment")
    .insert(req.body)
    .then(() => console.log("inserted comment"))
    .catch(err => console.log(err));
});

router.get("/comment/:id", (req, res) => {
  let shopid = req.params.id;
  knex("comment")
    .select(
      "comment.rating",
      "comment.content",
      "comment.created_at",
      "users.username",
      "shop.shopname"
    )
    .fullOuterJoin("users", "comment._userid", "users.id")
    .fullOuterJoin("shop", "comment._shopid", "shop.id")
    .where({ "comment._shopid": shopid })
    .then(rows => {
      console.log("getting comments for the shop");
      let rateArr = rows.map(row => row.rating);
      let temp = 0;
      for (let val of rateArr) {
        temp += Number(val);
      }
      if (rateArr.length > 0) {
        var avgRate = temp / rateArr.length;
      } else {
        var avgRate = 0;
      }
      res.send({ rows, avgRate});
    })
    .catch(err => console.log(err));
});

module.exports = router;

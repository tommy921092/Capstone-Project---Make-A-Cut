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

module.exports = router;

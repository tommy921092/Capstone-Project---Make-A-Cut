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
  let shopid = req.params.id;
  knex("shop")
    .where({ id: shopid })
    .then(rows => {
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

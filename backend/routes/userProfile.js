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

router.put("/:id", (req, res) => {
  let userid = req.params.id;
  console.log(req.params.id)
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

module.exports = router;

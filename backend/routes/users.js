require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});

let router = express.Router();
//async validation in user sign up page
router.get("/", (req, res) => {
  if (req.query.username || req.query.email) {
    knex("users")
      .where({ username: req.query.username })
      .orWhere({ email: req.query.email })
      .then(rows => {
        if (rows.length > 0) {
          if (rows[0].username === req.query.username) {
            res.send("User exist");
          } else {
            res.send("Email exist");
          }
        } else {
          res.send("OK");
        }
      });
  } else {
    res.send("Invalid query");
  }
});

router.get('/', (req, res) => {
  if (req.query.username || req.query.email) {
    knex("users").where({ username: req.query.username }).orWhere({ email: req.query.email })
      .then((rows) => {
        if (rows.length > 0) {
          if (rows[0].username === req.query.username) {
            res.send('User exist')
          } else {
            res.send('Email exist')
          }
        } else {
          res.send('OK')
        }
      })
  } else {
    res.send('Invalid query')
  }
})

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  console.log(req.body)
  knex("users").insert(req.body)
    .then(() => {
      console.log('reg success')
      res.json({ success: true })
    }).catch((err) => {
      console.log(err)
      res.status(404).send(err)
    });
});


module.exports = router;

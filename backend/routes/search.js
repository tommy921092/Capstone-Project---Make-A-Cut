require('dotenv').config();
const express = require('express');
const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});

let router = express.Router();

router.get('', (req, res) => {
  console.log(req.originalUrl)
  console.log('query :' + req.query.name)

  if (req.query.name) {
    knex("shop").whereRaw('shopname ~* ?', req.query.name)
      .then((rows) => {
        console.log(rows);
        if (rows.length > 0) {
          res.json(rows)
        } else {
          res.send('OK')
        }
      })
  } else {
    res.send('Invalid query')
  }
})

module.exports = router;
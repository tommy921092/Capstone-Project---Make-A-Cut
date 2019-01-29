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
const authenticate = require('../middlewares/authenticate')
const R = require('ramda')

let router = express.Router();

router.put("/", authenticate, (req, res) => {
  if (req.merchant_account) { //only merchant_account can do it
    knex.select(
      'shop.id').from('shop')
      .innerJoin('merchant', req.currentID, 'shop._merchantid')
      .then((result) => {
        let shopID = result[0].id
        var mapResult = x => {
          if (x.id) {
            return {
              id: x.id,
              name: x.name,
              _shopid: shopID,
              price: x.price
            }
          } else {
            return {
              name: x.name,
              _shopid: shopID,
              price: x.price
            }
          }
        };
        let MappedResult = R.map(mapResult, req.body.services)

        console.log(MappedResult)

        // abstract transactional batch update
        function batchUpdate(table, collection) {
          return knex.transaction(trx => {
            let queries = collection.map((tuple) => {
              if (tuple.id) {
                return knex(table)
                .where('id', tuple.id)
                .update({ name: tuple.name, _shopid: tuple._shopid, price: tuple.price })
                .transacting(trx)
              } else {
                return knex(table)
                .insert({ name: tuple.name, _shopid: tuple._shopid, price: tuple.price })
                .transacting(trx)
              }

            }
            );
            return Promise.all(queries)
              .then(trx.commit)
              .catch(trx.rollback);
          });
        }

        batchUpdate('menu', MappedResult);
      })
      .catch((err) => { throw err })
  } else {
    res.status(404).json({ error: 'Only accept Merchant request' });
  }
});

router.get("/:merchantID", (req, res) => {
  knex('menu').where('_shopid', req.params.merchantID)
    .then((rows) => {
      res.send(rows)
    })
});

module.exports = router;

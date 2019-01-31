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
const _ = require('lodash')

let router = express.Router();

router.put("/", authenticate, (req, res) => {
  if (req.merchant_account) { //only merchant_account can do it
    knex.select('id', 'name', '_shopid', 'price').from('menu').where('_shopid', req.currentID)
      .then((oldResult) => {
        var mapResult = x => {
          if (x.id) {
            return {
              id: x.id,
              name: x.name,
              _shopid: req.currentID,
              price: x.price
            }
          } else {
            return {
              name: x.name,
              _shopid: req.currentID,
              price: x.price
            }
          }
        };
        let MappedResult = R.map(mapResult, req.body.services)

        // console.log(MappedResult)
        // console.log(oldResult)

        // campare difference
        const needDelete = _.differenceBy(oldResult, MappedResult, 'id')
        /////////////////////


        // abstract transactional batch update
        function batchUpdate(table, collection, collection2) {
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

            let queries2 = collection2.map((tuple) => {
              return knex(table).where('id', tuple.id)
                .del()
                .transacting(trx)
            });

            return Promise.all(queries)
              .then(Promise.all(queries2))
              .then(trx.commit)
              .catch(trx.rollback);
          });
        }
        /////////////////////////////////////////

        batchUpdate('menu', MappedResult, needDelete);
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

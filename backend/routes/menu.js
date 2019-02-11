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

router.get('/:menuid', (req, res) => {
    if (req.params.menuid) {
        knex.select(
            'menu.id',
            'menu._shopid',
            'menu.name',
            'menu.price',
            'shop.shopname',
            'shop.notAvailble')
            .from('menu')
            .where('menu.id', req.params.menuid)
            .andWhere('menu.valid', true)
            .innerJoin('shop', 'shop.id', '=', 'menu._shopid')
            .then((rows) => {
                if (rows.length > 0) {
                    res.send(rows[0])
                } else {
                    res.send("No data")
                }

            })
    }
})

router.get('/date/:menuid', (req, res) => {
    if (req.params.menuid) {
        knex.select('_shopid')
            .from('menu')
            .where('id', req.params.menuid)
            .then((IDresult) => {
                if(IDresult.length > 0){
                    knex.select('bookingdate')
                    .from('booking')
                    .where('_shopid', IDresult[0]._shopid)
                    .andWhere('status','confirmed')
                    .then((rows) => {
                        const map1 = rows.map(x => x.bookingdate)
                        res.send(map1)
                    })
                } else {
                    res.send("Wrong menuID, no this shop")
                }
            })
    }
})

module.exports = router;
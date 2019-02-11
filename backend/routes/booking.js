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

router.get('/:uid',(req,res)=>{
    knex('booking')
    .where({uid:req.params.uid})
    .then((row)=>{
        if(row.length === 0){
            res.send("Invalid Booking");
        } else if (row[0].status !== "confirmed") {
            res.send("Booking already completed");
        } else {
            knex('booking')
            .where({uid:req.params.uid})
            .update({status:"completed"})
            .then(()=>{
                res.send(`Order Completed!`);
            })
        }

    })
})

module.exports = router;
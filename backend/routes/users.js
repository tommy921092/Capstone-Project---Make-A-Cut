require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
});

let router = express.Router();

router.get('/', (req,res)=>{
    res.send('you access user api')
})

router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    console.log(req.body)
    knex("users").insert(req.body)
    .then(()=>{
        console.log('reg success')
        res.json({ success: true })
    }).catch((err)=>{
        console.log(err)
        res.status(404).send(err)
    });

  });

module.exports = router;
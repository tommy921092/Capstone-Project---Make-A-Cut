require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') 
const config = require('../config')

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user:     process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});

let router = express.Router();

//user Login
router.post('/user', (req, res) => {
  let user = req.body;
  let userquery = knex.select("*").from("users").where("email", user.email);

  userquery.then((rows) => {
    if(rows.length) {
      if (bcrypt.compareSync(user.password, rows[0].password)) {
        const token = jwt.sign({
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
          fullname: rows[0].fullname
        }, config.jwtSecret)
        res.json({ token })

      } else {
        console.log('login fail')
        res.status(401).json({ errors: { form: "Invalid Credentials" } })
      }
    } else {
      res.status(401).json({ errors: { form: "Invalid Credentials" } })
    }
  })

});

// facebook login
// router.post('/facebook', (req, res) => {

//   if (req.body.access_token) {
//     var accessToken = req.body.access_token;

//     axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`)
//       .then((data) => {
//         if (!data.data.error) {
//           var payload = {
//             id: data.data.id,
//             username: data.data.name
//           };
//           const token = jwt.sign(payload, config.jwtSecret);
//           res.json({
//             token: token
//           });
//         } else {
//           res.sendStatus(401);
//         }
//       }).catch((err) => {
//         console.log(err);
//         res.status(401).json({ errors: { form: "Invalid Credentials" } })
//       });
//   } else {
//     res.status(401).json({ errors: { form: "Invalid Credentials" } })
//   }
// })

// merchant login
router.post('/merchant', (req, res) => {
  console.log(req.body)
  let merchant = req.body;
  let merchantquery = knex.select("*").from("merchant").where("email", merchant.email);

  merchantquery.then((rows) => {
    if(rows.length) {
      if (bcrypt.compareSync(merchant.password, rows[0].password)) {
        const token = jwt.sign({
          id: rows[0].id,
          email: rows[0].email,
          merchant: true
        }, config.jwtSecret)
        res.json({ token })

      } else {
        console.log('login fail')
        res.status(401).json({ errors: { form: "Invalid Credentials" } })
      }
    } else {
      res.status(401).json({ errors: { form: "Invalid Credentials" } })
    }
  })

});

module.exports = router;
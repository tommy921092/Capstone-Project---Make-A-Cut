require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../config')
const axios = require('axios')

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});

let router = express.Router();

//user Login
router.post('/user', (req, res) => {
  let user = req.body;
  let userquery = knex.select("*").from("users").where("email", user.email);

  userquery.then((rows) => {
    if (rows.length) {
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
router.post('/user/facebook', (req, res) => {

  if (req.body.access_token) {
    let accessToken = req.body.access_token;
    let email = req.body.email;

    axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`)
      .then((data) => {
        if (!data.data.error) {
          let userquery = knex.select("*").from("users").where("facebookid", data.data.id)
          userquery.then((rows) => {
            if (rows.length > 0) {
              var payload = {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email,
                fullname: rows[0].fullname
              };
              const token = jwt.sign(payload, config.jwtSecret);
              res.json({
                token
              });
            } else {
              let userquery = knex.select("*").from("users").where("email", email)
              userquery.then((rows) => {
                if (rows.length > 0) {
                  res.sendStatus(201)
                } else {
                  let userInfo = {
                    username: data.data.id,
                    fullname: data.data.name,
                    email: email,
                    password: "NO",
                    facebookid: data.data.id
                  }
                  knex("users").insert(userInfo).then((rows) => {
                    res.sendStatus(202);
                  })
                }
              })
            }
          })
        } else {
          res.sendStatus(401);
        }
      }).catch((err) => {
        console.log(err);
        res.status(401).json({ errors: { form: "Invalid Credentials" } })
      });
  } else {
    res.status(401).json({ errors: { form: "Invalid Credentials" } })
  }
})

// google login
router.post('/user/google', (req, res) => {

  if (req.body.access_token) {
    let accessToken = req.body.access_token;
    let email = req.body.email;
    let fullname = req.body.fullname;

    axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
      .then((data) => {
        if (!data.data.error) {
          
          let userquery = knex.select("*").from("users").where("googleid", data.data.user_id)
          userquery.then((rows) => {
            if (rows.length > 0) {
              var payload = {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email,
                fullname: rows[0].fullname
              };
              const token = jwt.sign(payload, config.jwtSecret);
              res.json({
                token
              });
            } else {
              let userquery = knex.select("*").from("users").where("email", email)
              userquery.then((rows) => {
                if (rows.length > 0) {
                  res.sendStatus(201)
                } else {
                  let userInfo = {
                    username: data.data.user_id,
                    fullname: fullname,
                    email: email,
                    password: "NO",
                    googleid: data.data.user_id
                  }
                  knex("users").insert(userInfo).then((rows) => {
                    res.sendStatus(202);
                  })
                }
              })
            }


          })
        } else {
          res.sendStatus(401);
        }
      }).catch((err) => {
        console.log(err);
        res.status(401).json({ errors: { form: "Invalid Credentials" } })
      });
  } else {
    res.status(401).json({ errors: { form: "Invalid Credentials" } })
  }
})

// merchant login
router.post('/merchant', (req, res) => {
  let merchant = req.body;
  let merchantquery = knex.select("*").from("merchant").where("email", merchant.email);

  merchantquery.then((rows) => {
    if (rows.length) {
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
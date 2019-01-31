require("dotenv").config();
const jwt = require('jsonwebtoken');
const config = require('../config');
const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
});

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  // decoded = 
  // { id: 1,
  //   email: 'toomanychung@gmail.com',
  //   merchant: true,
  //   iat: 1548752085 }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        console.dir(err)
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        if(decoded.merchant){ // Merchant User handler
          req.merchant_account = true;
          req.currentID = decoded.id;
          next();
        } else { //Normal User handler
          req.merchant_account = false;
          req.currentID = decoded.id;
          next();
        }

        // User.query({
        //     where: { id: decoded.id },
        //     select: [ 'email', 'id', 'username' ]
        // }).fetch().then(user => {
        //   if (!user) {
        //     res.status(404).json({ error: 'No such user' });
        //   } else {
        //     req.currentUser = user;
        //     next();
        //   }

        // })
      }
    })

  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
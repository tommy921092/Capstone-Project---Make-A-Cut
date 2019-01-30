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

const multer = require("multer");
const upload = multer({ dest: "./public/img/upload" });
const fs = require("fs");

const router = express.Router();
const R = require("ramda");

// Helper function //
var takeFileName = function (x) {
  if (R.contains(".")(x.originalname)) {
    var extentsionName = R.last(R.split(".")(x.originalname));
  } else {
    var extentsionName = "jpg";
  }

  let newFileName = `${x.filename}.${extentsionName}`;

  fs.renameSync(
    "./public/img/upload/" + x.filename,
    "./public/img/upload/" + newFileName,
    function (err) {
      if (err) {
        throw err;
      }
    }
  );

  return newFileName;
};
// -------------- //

router.post("/", upload.any(), (req, res, next) => {
  let photoArrayResult = R.map(takeFileName)(req.files); // This is the image array
  let dataForMerchant = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  let dataForShop = {
    address: req.body.district || null,
    shopname: req.body.name || null,
    tag: req.body.tag ? req.body.tag.split(",") : null || null,
    pricerange: req.body.averageFee || null,
    tel: req.body.contactNumber || null,
    website: req.body.website || null,
    openhour: req.body.openTime || null,
    closehour: req.body.closeTime || null,
    description: req.body.description || null,
    restday: null,
    photo: photoArrayResult
  };

  knex.transaction(trx => {
    return trx("merchant")
      .returning("id")
      .insert(dataForMerchant)
      .then(rows => {
        return trx("shop").insert({ _merchantid: rows[0], ...dataForShop });
      })
      .then(() => {
        console.log("inserted 2 rows");
        res.json({ success: true });
      })
      .catch(err => {
        console.log(
          "one of the queries failed, no rows were inserted and transaction was rolled back"
        );
        res.status(404).send(err);
      });
  });
});

router.get("/:shopid", (req, res) => {
  if(req.params.shopid){
    knex('shop').where('id', req.params.shopid)
    .then((rows)=>{
      res.send(rows)
    })
  }
})

module.exports = router;
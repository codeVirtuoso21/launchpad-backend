var express = require("express");
var router = express.Router();
const connectToDatabase = require("../config/database.js");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // Log the received data
  const { address } = req.body;
  const { db } = await connectToDatabase();
  console.log("Connected to database");
  await db.users.find({ address: address }, function (err, result) {
    if (err) {
      // handle error
    } else {
      // handle success
      res.status(200).json({
        status: "success",
        result: result,
      });
    }
  });
});

module.exports = router;

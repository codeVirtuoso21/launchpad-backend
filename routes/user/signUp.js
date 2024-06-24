var express = require("express");
var router = express.Router();
const connectToDatabase = require("../../config/database.js");

/* post users listing. */
router.post("/", async function (req, res, next) {
  const { address } = req.body;
  const { db } = await connectToDatabase();
  console.log("Connected to database");

  const result = await db
    .collection("users")
    .find({ address: address })
    .toArray();

  if (result.length == 0) {
    // insert wallet address
    await db
      .collection("users")
      .insertOne({
        address: address,
        twitterID: "",
        twitterName: "",
        twitterDisplayName: "",
        airdropSeeds: 0,
        claimSeeds: 0,
      });
  }

  res.status(200).json({
    status: "success",
  });
});

module.exports = router;

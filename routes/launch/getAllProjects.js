var express = require("express");
var router = express.Router();
const connectToDatabase = require("../../config/database.js");

/* post users listing. */
router.post("/", async function (req, res, next) {
  const { address } = req.body;
  const { db } = await connectToDatabase();
  console.log("Connected to database");

  const result = await db
    .collection("projects")
    .find({ username: address })
    .toArray();
  console.log("result", result);
  res.status(200).json({
    status: "success",
    result: result,
  });
});

module.exports = router;

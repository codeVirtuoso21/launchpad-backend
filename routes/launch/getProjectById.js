var express = require("express");
var router = express.Router();
const connectToDatabase = require("../../config/database.js");
const { ObjectId } = require('mongodb');

/* post users listing. */
router.post("/", async function (req, res, next) {
  const { pid } = req.body;
  const { db } = await connectToDatabase();
  console.log("Connected to database");
  console.log("typeof pid", typeof pid)
  if (typeof pid === 'number') {
    pid = pid.toString();
  }
  const result = await db
    .collection("projects")
    .find({ _id: new ObjectId(pid) })
    .toArray();
  console.log("result", result);
  res.status(200).json({
    status: "success",
    result: result,
  });
});

module.exports = router;

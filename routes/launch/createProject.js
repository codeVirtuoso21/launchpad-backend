var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const connectToDatabase = require("../../config/database.js");

/* POST save project data. */
router.post("/", async (req, res) => {
  const {
    username,
    approveStatus,
    type,
    contractAddress,
    projectName,
    email,
    projectDetails,
    platform,
    projectStatus,
    funds,
    visibility,
    fundTarget,
    projectLink,
    telegram,
    twitter,
  } = req.body;

  // Log the received data
  const { db } = await connectToDatabase();
  console.log("Connected to database");

  await db.collection("projects").insertOne(
    {
      username: username,
      approveStatus: approveStatus,
      type: type,
      contractAddress: contractAddress,
      projectName: projectName,
      email: email,
      projectDetails: projectDetails,
      platform: platform,
      projectStatus: projectStatus,
      funds: funds,
      visibility: visibility,
      fundTarget: fundTarget,
      projectLink: projectLink,
      telegram: telegram,
      twitter: twitter,
    },
    function (err, result) {
      if (err) {
        // handle error
      } else {
        // handle success
        console.log("result", result);
      }
    }
  );

  res.status(200).json({
    message: "Project saved successfully!",
    status: "success",
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
// const Twitter = require("twitter");
const { TwitterApi } = require("twitter-api-v2");
// const connectToDatabase = require("../config/database.js");

router.post("/", async function (req, res, next) {
  try {
    const client = new TwitterApi({
      appKey: "hs05K7hnxGhlmRAUohkLHISKj",
      appSecret: "IyPIXaApwIKT2lKGbN3jlSOsbvVPbPx6IqifeY3ycJAgyD16cr",
      accessToken: "1669479203895377922-slpclmWjWjjjfbK0Fy7VNyuTUb7OVh",
      accessSecret: "bnwiBCNYitLsjUlL7kq1z5yGkH5sTGnh2UgvB82XUhNGq",
    });
    const rwClient = client.readWrite; // Read-write client
    const { username } = req.body;
    console.log("username:", username);

    try {
      const response = await rwClient.v1.friendshipsCreate({
        screen_name: username,
      });
      console.log("response:", response);
      res.status(200).send(username);
    } catch (error) {
      res.status(500).send(error);
    }
    // const { db } = await connectToDatabase();
    // console.log("Connected to database");

    // const users = await db.collection("users").find({}).toArray();
    // console.log("users", users);

    // res.send("users page dashboard");
  } catch (error) {
    console.error("Failed to connect to database", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

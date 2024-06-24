const connectToDatabase = require("../config/database.js");

const updateUserInfoByTwitter = async (userInfo, key) => {
  const { twitterID, twitterName, twitterDisplayName } = userInfo;

  // Log the received data
  const { db } = await connectToDatabase();
  console.log("Connected to database");
  console.log("twitterID", twitterID);
  console.log("key", key);

  await db
    .collection("users")
    .updateOne(
      { address: key },
      {
        $set: {
          twitterID: twitterID,
          twitterName: twitterName,
          twitterDisplayName: twitterDisplayName,
        },
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
};

module.exports = updateUserInfoByTwitter;

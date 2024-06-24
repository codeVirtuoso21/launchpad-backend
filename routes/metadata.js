var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    name: "NFT Art",
    description: "This image shows the true nature of NFT.",
    image:
      "https://qn-shared.quicknode-ipfs.com/ipfs/QmQEVVLJUR1WLN15S49rzDJsSP7za9DxeqpUzWuG4aondg",
  });
});

module.exports = router;

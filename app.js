const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

// Routers
const metadataRouter = require("./routes/metadata");
const usersRouter = require("./routes/users");
const indexRouter = require("./routes");
const createProjectRouter = require("./routes/launch/createProject");
const twitterFollow = require("./routes/twitter/follow");
const getUserById = require("./routes/user/getUserById");
const signUp = require("./routes/user/signUp");
const getAllProjects = require("./routes/launch/getAllProjects");
const getProjectById = require("./routes/launch/getProjectById");
const updateUserInfoByTwitter = require("./utils/twitter.js");

// Initial
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Twitter strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: "hs05K7hnxGhlmRAUohkLHISKj",
      consumerSecret: "IyPIXaApwIKT2lKGbN3jlSOsbvVPbPx6IqifeY3ycJAgyD16cr",
      callbackURL: "http://localhost:4000/auth/twitter/callback",
    },
    (token, tokenSecret, profile, done) => {
      // Here you can save the profile info to your database if needed
      return done(null, profile);
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
  const walletAddress = obj.wallet;
  console.log("walletAddress", walletAddress);
  done(null, obj);
});

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/metadata", metadataRouter);
app.use("/api/createProject", createProjectRouter);
app.use("/twitter/follow", twitterFollow);
app.use("/api/user/getUserById", getUserById);
app.use("/api/user/signUp", signUp);
app.use("/api/getAllProjects", getAllProjects);
app.use("/api/getProjectById", getProjectById);

let walletAddr = "";
// Twitter auth routes
app.get("/auth/twitter", (req, res, next) => {
  // Extract user data from query parameters
  const userData = req.query.userData ? JSON.parse(req.query.userData) : {};
  walletAddr = userData.wallet;
  // Pass user data to passport authentication middleware
  passport.authenticate("twitter", { userData })(req, res, next);
});

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    const userInfo = {
      twitterID: res.req.user.id,
      twitterName: res.req.user.username,
      twitterDisplayName: res.req.user.displayName,
    };
    // console.log("res", res.req.user)
    updateUserInfoByTwitter(userInfo, walletAddr);
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/airdrop");
  }
);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

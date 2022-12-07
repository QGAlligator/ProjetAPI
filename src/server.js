const express = require("express");

const { registerUser, loginUser } = require("./controllers/login.controller");
const {
  getUser,
  patchUser,
  delUser,
} = require("./controllers/user.controller");

const { dtoUserRegister, dtoUserLogin } = require("./dto/login.dto");
const { dtoUserGet, dtoUserPatch, dtoUserDel } = require("./dto/user.dto");

const {
  postTweeti,
  getTweeti,
  patchTweeti,
  delTweeti,
  postLike,
  delLike,
} = require("./controllers/tweeti.controller");
const {
  dtoTweetiPost,
  dtoTweetiGet,
  dtoTweetiPatch,
  dtoTweetiDel,
  dtoLikePost,
  dtoLikeDel,
} = require("./dto/tweeti.dto");

const { postVote, delVote } = require("./controllers/poll.controller");
const { dtoPollPost, dtoPollDel } = require("./dto/poll.dto");

const isAuth = require("./middlewares/auth.middleware");
require("./database");

const app = express();

app.use(express.json());

// USER
app.post("/register", dtoUserRegister, registerUser);
app.post("/login", dtoUserLogin, loginUser);

app.get("/user", isAuth, dtoUserGet, getUser);

app.patch("/user", isAuth, dtoUserPatch, patchUser);
app.delete("/user", isAuth, dtoUserDel, delUser);

// TWEETI
app.post("/post", isAuth, dtoTweetiPost, postTweeti);

app.get("/post/:tweetiid", dtoTweetiGet, getTweeti);

app.patch("/post/:tweetiid", isAuth, dtoTweetiPatch, patchTweeti);
app.delete("/post/:tweetiid", isAuth, dtoTweetiDel, delTweeti);

app.post("/post/:tweetiid/like", isAuth, dtoLikePost, postLike);
app.delete("/post/:tweetiid/unlike", isAuth, dtoLikeDel, delLike);

// SONDAGE
app.post("/post/:tweetiid/select:choice", isAuth, dtoPollPost, postVote);
app.delete("/post/:tweetiid/unselect", isAuth, dtoPollDel, delVote);

app.listen(3000, () => {
  console.log("Server running");
});

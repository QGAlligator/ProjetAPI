const Tweeti = require("../models/tweetis.model");

const dtoTweetiPost = (req, res, next) => {
  try {
    const text = req.body.text;
    const question = req.body.question;
    const choice1 = req.body.choice1;
    const choice2 = req.body.choice2;

    if (typeof text !== "string") {
      res.status(401).json({ text: "Text must be a string" });
      return;
    }

    if (text.length < 1) {
      res.status(401).json({ text: "Text must have one or more characters" });
      return;
    }

    if (question && typeof question !== "string") {
      res.status(401).json({ text: "Question must be a string" });
      return;
    }

    if (question && (choice1.length < 1 || choice2.length < 1)) {
      res
        .status(401)
        .json({ text: "Choices must have one or more characters" });
      return;
    }

    if (
      question &&
      (typeof choice1 !== "string" || typeof choice2 !== "string")
    ) {
      res.status(401).json({ text: "Choices must be a string" });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const dtoTweetiGet = async (req, res, next) => {
  try {
    const tweetiid = req.params.tweetiid;
    if (tweetiid.length != 24) {
      res.status(400).json({
        text: "The Id is invalid",
      });
      return;
    }

    const tweeti = await Tweeti.findOne({
      _id: tweetiid,
    });
    if (!tweeti) {
      res.status(403).json({
        text: "This tweet doesn't exist",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const dtoTweetiPatch = async (req, res, next) => {
  try {
    const text = req.body.text;
    const question = req.body.question;
    const choice1 = req.body.choice1;
    const choice2 = req.body.choice2;

    if (typeof text !== "string") {
      res.status(401).json({ text: "Text must be a string" });
      return;
    }

    if (text.length < 1) {
      res.status(401).json({ text: "Text must have one or more characters" });
      return;
    }

    const tweetiid = req.params.tweetiid;
    if (tweetiid.length != 24) {
      res.status(400).json({
        text: "The Id is invalid",
      });
      return;
    }
    if (question && typeof question !== "string") {
      res.status(401).json({ text: "Question must be a string" });
      return;
    }

    if (question && (choice1.length < 1 || choice2.length < 1)) {
      res
        .status(401)
        .json({ text: "Choices must have one or more characters" });
      return;
    }

    if (
      question &&
      (typeof choice1 !== "string" || typeof choice2 !== "string")
    ) {
      res.status(401).json({ text: "Choices must be a string" });
      return;
    }

    const tweeti = await Tweeti.findOne({
      _id: tweetiid,
      id_author: req.user._id,
    });
    if (!tweeti) {
      res.status(403).json({
        text: "You are not the author of this tweet or this tweet doesn't exist",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const dtoTweetiDel = async (req, res, next) => {
  try {
    const tweetiid = req.params.tweetiid;
    if (tweetiid.length != 24) {
      res.status(400).json({
        text: "The Id is invalid",
      });
      return;
    }

    const tweeti = await Tweeti.findOne({
      _id: tweetiid,
      id_author: req.user._id,
    });
    if (!tweeti) {
      res.status(403).json({
        text: "You are not the author of this tweet or this tweet doesn't exist",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const dtoLikePost = async (req, res, next) => {
  try {
    const tweetiid = req.params.tweetiid;
    if (tweetiid.length != 24) {
      res.status(400).json({
        text: "The Id is invalid",
      });
      return;
    }

    const tweeti = await Tweeti.findOne({ _id: tweetiid });
    if (!tweeti) {
      res.status(403).json({
        text: "This tweet doesn't exist",
      });
      return;
    }

    const like = tweeti.likes.findIndex((find) => find == req.user._id);
    if (like >= 0) {
      res.status(403).json({
        text: "You already liked this tweet",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const dtoLikeDel = async (req, res, next) => {
  try {
    const tweetiid = req.params.tweetiid;
    if (tweetiid.length != 24) {
      res.status(400).json({
        text: "The Id is invalid",
      });
      return;
    }

    const tweeti = await Tweeti.findOne({ _id: tweetiid });
    if (!tweeti) {
      res.status(403).json({ text: "This tweet doesn't exist" });
      return;
    }

    const like = tweeti.likes.findIndex((find) => find == req.user._id);
    if (like == -1) {
      res.status(403).json({ text: "You don't like that tweet" });
      return;
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  dtoTweetiPost,
  dtoTweetiGet,
  dtoTweetiPatch,
  dtoTweetiDel,
  dtoLikePost,
  dtoLikeDel,
};

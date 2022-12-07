const Choice = require("../models/sondagechoices.model");
const Tweeti = require("../models/tweetis.model");

const dtoPollPost = async (req, res, next) => {
  try {
    const tweetiid = req.params.tweetiid;
    const choice = req.params.choice - 1;
    const choices = await Choice.find({ tweeti: tweetiid });

    if (choice.length < 1 || choice > 1 || choice < 0) {
      res.status(400).json({
        text: "Choice must be 1 or 2",
      });
      return;
    }

    if (typeof choice !== "number") {
      res.status(401).json({ text: "Choice must be a number" });
      return;
    }

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

    if (!tweeti.question) {
      res.status(401).json({ text: "This tweet isn't a survey" });
      return;
    }

    const vote1 = choices[0].selected.findIndex((find) => find == req.user._id);
    const vote2 = choices[1].selected.findIndex((find) => find == req.user._id);
    if (vote1 >= 0 || vote2 >= 0) {
      res.status(403).json({
        text: "You already voted this survey",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const dtoPollDel = async (req, res, next) => {
  try {
    const tweetiid = req.params.tweetiid;
    const choice = req.params.choice - 1;
    const choices = await Choice.find({ tweeti: tweetiid });

    if (typeof choice !== "number") {
      res.status(401).json({ text: "Choice must be a number" });
      return;
    }

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

    if (!tweeti.question) {
      res.status(401).json({ text: "This tweet isn't a survey" });
      return;
    }

    const vote1 = choices[0].selected.findIndex((find) => find == req.user._id);
    const vote2 = choices[1].selected.findIndex((find) => find == req.user._id);
    if (vote1 < 0 && vote2 < 0) {
      res.status(403).json({
        text: "You don't have vote on this survey",
      });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  dtoPollPost,
  dtoPollDel,
};

const Tweeti = require("../models/tweetis.model");
const Choice = require("../models/sondagechoices.model");

const postTweeti = async (req, res) => {
  try {
    const tweeti = new Tweeti();
    tweeti.id_author = req.user._id;
    tweeti.name_author = req.user.login;
    tweeti.text = req.body.text;
    tweeti.likes = [];

    await tweeti.save();
    if (req.body.question) {
      tweeti.question = req.body.question;

      const choice1 = new Choice();
      choice1.tweeti = tweeti._id;
      choice1.text = req.body.choice1;
      choice1.selected = [];

      const choice2 = new Choice();
      choice2.tweeti = tweeti._id;
      choice2.text = req.body.choice2;
      choice2.selected = [];

      await tweeti.save();
      await choice1.save();
      await choice2.save();
      res.status(201).json({
        author: req.user.login,
        text: tweeti.text,
        likes: tweeti.likes.length,
        question: tweeti.question,
        choice1: choice1.text,
        choice2: choice2.text,
      });
    } else {
      res.status(201).json({
        author: req.user.login,
        text: tweeti.text,
        likes: tweeti.likes.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const getTweeti = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const tweeti = await Tweeti.findOne({ _id: tweetiid });

    if (tweeti.question) {
      const choices = await Choice.find({ tweeti: tweetiid });
      res.status(201).json({
        id_author: tweeti.id_author,
        name_author: tweeti.name_author,
        text: tweeti.text,
        likes: tweeti.likes.length,
        question: tweeti.question,
        choice1: choices[0].text,
        choice1r: choices[0].selected.length,
        choice2: choices[1].text,
        choice2r: choices[1].selected.length,
      });
    } else {
      res.status(201).json({
        id_author: tweeti.id_author,
        name_author: tweeti.name_author,
        text: tweeti.text,
        likes: tweeti.likes.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const patchTweeti = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const text = req.body.text;

    const tweeti = await Tweeti.findOne({ _id: tweetiid });

    tweeti.text = text;

    if (tweeti.question) {
      const choices = await Choice.find({ tweeti: tweetiid });
      if (req.body.question) {
        tweeti.question = req.body.question;
      }

      if (req.body.choice1) {
        choices[0].text = req.body.choice1;
        choices[0].selected = [];
        await choices[0].save();
      }

      if (req.body.choice2) {
        choices[1].text = req.body.choice2;
        choices[1].selected = [];
        await choices[1].save();
      }
    }

    await tweeti.save();

    if (tweeti.question) {
      const choices = await Choice.find({ tweeti: tweetiid });
      res.status(201).json({
        id_author: tweeti.id_author,
        name_author: tweeti.name_author,
        text: tweeti.text,
        likes: tweeti.likes.length,
        question: tweeti.question,
        choice1: choices[0].text,
        choice1r: choices[0].selected.length,
        choice2: choices[1].text,
        choice2r: choices[1].selected.length,
      });
    } else {
      res.status(201).json({
        id_author: tweeti.id_author,
        name_author: tweeti.name_author,
        text: tweeti.text,
        likes: tweeti.likes.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const delTweeti = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const tweeti = await Tweeti.findOne({ _id: tweetiid });

    if (tweeti.question) {
      const choices = await Choice.find({ tweeti: tweetiid });
      await choices.remove();
    }

    await tweeti.remove();

    res.status(200).send("Post has been succesfully deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const postLike = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const tweeti = await Tweeti.findOne({ _id: tweetiid });

    tweeti.likes.push(req.user._id);
    await tweeti.save();
    res.status(201).json({
      id_author: tweeti.id_author,
      name_author: tweeti.name_author,
      text: tweeti.text,
      likes: tweeti.likes.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const delLike = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const tweeti = await Tweeti.findOne({ _id: tweetiid });

    const index = tweeti.likes.findIndex((find) => req.user._id);
    tweeti.likes.splice(index, 1);
    await tweeti.save();
    res.status(201).json({
      id_author: tweeti.id_author,
      name_author: tweeti.name_author,
      text: tweeti.text,
      likes: tweeti.likes.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  postTweeti,
  getTweeti,
  patchTweeti,
  delTweeti,
  postLike,
  delLike,
};

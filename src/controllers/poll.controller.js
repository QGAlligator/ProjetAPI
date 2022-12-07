const Choice = require("../models/sondagechoices.model");
const Tweeti = require("../models/tweetis.model");

const postVote = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const choice = req.params.choice - 1;
    const tweeti = await Tweeti.findOne({ _id: tweetiid });
    const choices = await Choice.find({ tweeti: tweetiid });

    choices[choice].selected.push(req.user._id);
    await choices[choice].save();
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
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

const delVote = async (req, res) => {
  try {
    const tweetiid = req.params.tweetiid;
    const tweeti = await Tweeti.findOne({ _id: tweetiid });
    const choices = await Choice.find({ tweeti: tweetiid });

    const vote1 = choices[0].selected.findIndex((find) => find == req.user._id);
    const vote2 = choices[1].selected.findIndex((find) => find == req.user._id);

    if (vote1 >= 0) {
      choices[0].selected.splice(vote1, 1);
      await choices[0].save();
    }

    if (vote2 >= 0) {
      choices[1].selected.splice(vote2, 1);
      await choices[1].save();
    }

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
  } catch (error) {
    console.log(error);
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  postVote,
  delVote,
};

const User = require("../models/user.model");

const getUser = async (req, res) => {
  try {
    const user = req.user;

    console.log(user);
    res.status(200).json({ username: user.login });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

const patchUser = async (req, res) => {
  try {
    const user = req.user;
    const data = req.body.username;

    user.login = data;

    await user.save();
    res.status(200).json({ username: user.login });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

const delUser = async (req, res) => {
  try {
    const user = req.user;

    await user.remove();

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  getUser,
  patchUser,
  delUser,
};

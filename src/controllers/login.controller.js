const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");

SECRET = "mystereetbouledegomme";

function getToken(id) {
  return jsonwt.sign(
    {
      id: id,
    },
    SECRET,
    { expiresIn: "3 hours" }
  );
}

const registerUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = new User();
    const hash = bcrypt.hashSync(password, 10);
    user.login = login;
    user.password = hash;

    await user.save();

    const token = getToken(user._id);

    res.status(201).json({
      username: login,
      token: token,
    });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login: login });

    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = getToken(user._id);

        res.status(200).json({
          username: login,
          token: token,
        });
        return;
      } else {
        res.status(401).json({ message: "Password or login incorrect" });
      }
    });
  } catch (error) {
    res.status(500).send("An error has occured");
  }
};

module.exports = {
  registerUser,
  loginUser,
};

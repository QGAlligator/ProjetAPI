const User = require("../models/user.model");

const dtoUserRegister = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (typeof login !== "string") {
      res.status(401).json({ login: "Username missing or invalid" });
      return;
    }

    if (typeof password !== "string") {
      res.status(401).json({ password: "Password missing or invalid" });
      return;
    }

    if (login.length < 3) {
      res
        .status(401)
        .json({ login: "Username must have 3 or more characters" });
      return;
    }

    if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")) {
      res.status(401).json({
        password:
          "Password must have 8 or more characters, a upper and lower case and a digit",
      });
      return;
    }

    const userExist = await User.exists({ login: login });
    if (userExist) {
      res.status(401).json({ message: "Username already exists" });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoUserLogin = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (typeof login !== "string") {
      res.status(401).json({ login: "Username missing or invalid" });
      return;
    }

    if (typeof password !== "string") {
      res.status(401).json({ password: "Password missing or invalid" });
      return;
    }

    const userExist = await User.exists({ login: login });
    if (!userExist) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

module.exports = {
  dtoUserRegister,
  dtoUserLogin,
};

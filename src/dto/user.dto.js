const User = require("../models/user.model");

const dtoUserGet = async (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoUserPatch = async (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

const dtoUserDel = async (req, res, next) => {
  try {
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

module.exports = {
  dtoUserGet,
  dtoUserPatch,
  dtoUserDel,
};

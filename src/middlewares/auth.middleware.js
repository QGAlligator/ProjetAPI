const User = require("../models/user.model");
const jsonwt = require("jsonwebtoken");

SECRET = "mystereetbouledegomme";

const isAuthenticated = async (req, res, next) => {
  try {
    console.log(req.headers);
    let token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }

    const matches = token.match(/(bearer)\s+(\S+)/i);
    token = matches && matches[2];

    return jsonwt.verify(token, SECRET, async (err) => {
      if (err) {
        res.status(401).json({ message: "Bad token" });
        return;
      } else {
        const data = jsonwt.decode(token);

        if (data.exp < Date.now) {
          res.status(401).json({ message: "Token has expired" });
          return;
        }

        const user = await User.findById(data.id);
        if (!user) {
          res.status(404).json({ message: "Username not found" });
          return;
        }

        req.user = user;
        return next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occured" });
  }
};

module.exports = isAuthenticated;

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match)
      return res.status(401).json({ message: "Password does not match" });

    const roles = foundUser.roles;
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, roles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const refreshAccessToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    const roles = decoded.UserInfo.roles;
    const username = decoded.UserInfo.username;

    const newAccessToken = jwt.sign(
      { UserInfo: { username, roles } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ accessToken: newAccessToken });
  });
};

module.exports = { loginUser, refreshAccessToken };

const User = require("../models/User");

const registerUser = async (req, res) => {
  const { user, pwd, role } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Check for duplicate usernames
    const duplicate = await User.findOne({ username: user });
    if (duplicate)
      return res.status(409).json({ message: "Username already exists." });

    // Create and save the new user
    const newUser = new User({ username: user, password: pwd, roles: role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };

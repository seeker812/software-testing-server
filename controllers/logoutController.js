const logoutUser = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { logoutUser };

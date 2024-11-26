const express = require("express");
const router = express.Router();
const { refreshAccessToken } = require("../controllers/authController");

router.get("/", refreshAccessToken);

module.exports = router;

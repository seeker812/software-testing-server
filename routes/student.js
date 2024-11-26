const express = require("express");
const router = express.Router();
const {
  upsertStudentDetails,
  getAllStudentDetails,
} = require("../controllers/studentDetailsController");

// POST: Add or Update Student Details
router.post("/", upsertStudentDetails);

// GET: View All Student Details
router.get("/", getAllStudentDetails);

module.exports = router;

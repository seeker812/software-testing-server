const StudentDetails = require("../models/StudentDetails");

// Add or Update Student Details
const upsertStudentDetails = async (req, res) => {
  const { userId, ...details } = req.body;

  try {
    const studentDetails = await StudentDetails.findOneAndUpdate(
      { userId },
      { ...details, userId },
      { new: true, upsert: true } // Upsert: Create a new document if none exists
    );
    res
      .status(200)
      .json({ message: "Details saved successfully", studentDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// View All Student Details
const getAllStudentDetails = async (req, res) => {
  try {
    const studentDetails = await StudentDetails.find().populate(
      "userId",
      "username email"
    );
    res.status(200).json(studentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { upsertStudentDetails, getAllStudentDetails };

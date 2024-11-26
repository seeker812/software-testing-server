const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema({
  userId: {
    type: String, // Change this from ObjectId to String
    required: true,
  },
  name: String,
  mothersName: String,
  fathersName: String,
  address: String,
  city: String,
  phoneNumber: String,
  email: String,
  postalCode: String,
  dateOfBirth: Date,
  salary: Number,
});

module.exports = mongoose.model("StudentDetails", studentDetailsSchema);

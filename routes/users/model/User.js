const mongoose = require("mongoose");

// the new keyword means create a new object {}
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);

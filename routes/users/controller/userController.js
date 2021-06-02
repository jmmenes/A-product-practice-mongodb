//User is coming from mongoDB Schema
//in human term - a template to create a user
const User = require("../model/User");

//hashing password library
const bcrypt = require("bcryptjs");

//exporting an object with key and value
async function getAllUsers() {
  try {
    let foundAllUsers = await User.find({});
    return foundAllUsers;
  } catch (error) {
    return error;
  }
}

async function createUser(body) {
  try {
    let createdSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(body.password, createdSalt);
    let savedUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      password: hashedPassword,
      email: body.email,
      username: body.username,
    });
    return await savedUser.save();
  } catch (error) {
    return error;
  }
}

async function updateUserByID() {}
async function deleteUserByID() {}

module.exports = {
  getAllUsers,
  createUser,
  updateUserByID,
  deleteUserByID,
};

// User is coming from mongoDB Schema
// In human term - a template to create a user
const User = require("../model/User");
// hashing password library
const bcrypt = require("bcryptjs");

// exporting an object with key and value
module.exports = {
  getAllUsers: function () {
    return new Promise(function (resolve, reject) {
      User.find({})
        .then((payload) => {
          resolve(payload);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  createUser: function (body) {
    return new Promise((resolve, reject) => {
      bcrypt
        .genSalt(10)
        .then((salt) => {
          return bcrypt.hash(body.password, salt);
        })
        .then((hashedPassword) => {
          let savedUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            password: hashedPassword,
            email: body.email,
            username: body.username,
          });
          return savedUser.save();
        })
        .then((savedUser) => {
          resolve(savedUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateUserByID: function (id, body) {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((updatedUser) => resolve(updatedUser))
        .catch((error) => reject(error));
    });
  },

  deleteUserByID: function (id) {
    return new Promise((resolve, reject) => {
      User.findByIdAndRemove({ _id: id })
        .then((deletedUser) => resolve(deletedUser))
        .catch((error) => reject(error));
    });
  },
};

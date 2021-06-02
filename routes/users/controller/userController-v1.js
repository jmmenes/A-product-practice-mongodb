// User is coming from mongoDB Schema
// In human term - a template to create a user
const User = require("../model/User");
// hashing password library
const bcrypt = require("bcryptjs");

// exporting an object with key and value
module.exports = {
  getAllUsers: function (callback) {
    // User.find({}) is a mongoose function to query the database
    // it takes in a callback - that returns two parameters - the first one
    // is always error and the second one is payload (Users data)
    User.find({}, function (err, payload) {
      // err = {
      //    error: true,
      //    message: "Something is wrong",
      // };
      if (err) {
        callback(err, null);
      } else {
        callback(null, payload);
      }
    });
  },

  createUser: function (body, callback) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        callback(err, null);
      } else {
        bcrypt.hash(body.password, salt, function (err, hash) {
          if (err) {
            callback(err, null);
          } else {
            //create a mongodb User OBJECT it will assign a unique ID for the user
            //WHAT IF THERE'S OTHER CHECKS I HAVE TO DO INSIDE THIS BLOCK
            let savedUser = new User({
              firstName: body.firstName,
              lastName: body.lastName,
              password: hash,
              email: body.email,
              username: body.username,
            });
            //the save() function will save it to the database
            savedUser.save(function (err, payload) {
              if (err) {
                callback(err, null);
              } else {
                callback(null, payload);
              }
            });
          }
        });
      }
    });
  },

  updateUserByID: function (id, body, callback) {
    User.findByIdAndUpdate({ _id: id }, body, { new: true }, function (err, updatedPayload) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, updatedPayload);
      }
    });
  },

  deleteUserByID: function (id, callback) {
    User.findByIdAndRemove({ _id: id }),
      function (err, deletedPayload) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, deletedPayload);
        }
      };
  },
};

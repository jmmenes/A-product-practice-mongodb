var express = require("express");
var router = express.Router();

// bring in the User controller
var userController = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    test: true,
  });
});

router.get("/get-all-users", function (req, res) {
  userController.getAllUsers(function (err, payload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: payload });
    }
  });
});

router.post("/create-user", function (req, res) {
  userController.createUser(req.body, function (err, payload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: payload });
    }
  });
});

router.put("/update-user-by-id/:id", function (req, res) {
  userController.updateUserByID(req.params.id, req.body, function (err, updatedPayload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: updatedPayload });
    }
  });
});

router.delete("/delete-user-by-id/:id", function (req, res) {
  userController.deleteUserByID(req.params.id, function (err, deletedPayload) {
    if (err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: deletedPayload });
    }
  });
});

module.exports = router;

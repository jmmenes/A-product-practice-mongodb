var express = require("express");
var router = express.Router();

// bring in the User controller
var { getAllUsers, createUser, updateUserByID, deleteUserByID } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    test: true,
  });
});

router.get("/get-all-users", async function (req, res) {
  try {
    let foundAllUsers = await getAllUsers();
    res.json({ message: "success", foundAllUsers });
  } catch (error) {
    res.json({ message: "failure", error: error.message });
  }
});

router.post("/create-user", async function (req, res) {
  try {
    let createdUser = await createUser(req.body);
    res.json({ message: "success", createdUser });
  } catch (error) {
    res.json({ message: "failure", error: error.message });
  }
});

router.put("/update-user-by-id/:id", function (req, res) {});
router.delete("/delete-user-by-id/:id", function (req, res) {});

module.exports = router;

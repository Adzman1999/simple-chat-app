const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/UserControllers");
const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/create").post(registerUser);
router.post("/login", authUser);

module.exports = router;

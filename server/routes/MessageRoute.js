const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/MessageController");
const { protect } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;

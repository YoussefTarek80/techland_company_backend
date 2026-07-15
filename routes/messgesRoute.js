const MessageController = require("../controllers/messagesController");
const express = require("express");
const router = express.Router();
const adminOnly = require('../middlewares/adminOnly');
router.post("/", MessageController.addMessage);
router.delete("/:id", adminOnly, MessageController.deleteMessage);
router.get("/", adminOnly, MessageController.getAllMessages);

module.exports = router;
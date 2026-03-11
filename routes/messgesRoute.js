const MessageController = require("../controllers/messagesController");
const express = require("express");
const router = express.Router();
const adminOnly = require('../middlewares/adminOnly');
router.get("/",adminOnly, MessageController.getAllMessages);
router.post("/", MessageController.addMessage);
module.exports = router;
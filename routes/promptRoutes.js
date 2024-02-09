const express = require("express");
const { promptInput, promptDelete } = require("../controller/promptController");
const { auth, isUser } = require("../middlewares/auth");
const promptRouter = express.Router();

promptRouter
  .post("/promptInput", promptInput)
  .post("/deleteprompt", auth, isUser, promptDelete);

module.exports = promptRouter;

const {Router} = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");
const isAuth = require("../config/authMiddleware").isAuth;
const isMember = require("../config/authMiddleware").isMember;
const db = require("../db/queries");


messagesRouter.get("/", isAuth, isMember, messagesController.getMessagePage);

module.exports = messagesRouter;
const {Router} = require("express");
const messagesRouter = Router();
const isAuth = require("../config/authMiddleware").isAuth;
const isMember = require("../config/authMiddleware").isMember

messagesRouter.get("/", isAuth, isMember, (req, res) => {
        res.render("messages")
});

module.exports = messagesRouter;
const {Router} = require("express");
const signupRouter = Router();
const signupController = require("../controllers/signupController");

signupRouter.get("/", (req, res) => res.render("signup"));
signupRouter.post("/", signupController.signUp);

module.exports = signupRouter;
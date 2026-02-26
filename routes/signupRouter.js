const {Router} = require("express");
const signupRouter = Router();
const signupController = require("../controllers/signupController");
const {signupValidationRules, handleValidationErrors} = require("../controllers/validators");

signupRouter.get("/", (req, res) => res.render("signup", {errors: [], values: {}}));
signupRouter.post(
    "/", 
    signupValidationRules,
    handleValidationErrors("signup"),
    signupController.signUp
);
signupRouter.get("/membership", (req, res) => res.render("membership"));
signupRouter.post("/membership", signupController.joinMembership);

module.exports = signupRouter;
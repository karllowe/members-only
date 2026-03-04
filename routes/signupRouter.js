const {Router} = require("express");
const signupRouter = Router();
const signupController = require("../controllers/signupController");
const {signupValidationRules, membershipValidationRules, handleValidationErrors} = require("../controllers/validators");

signupRouter.get("/", (req, res) => res.render("signup", {errors: [], values: {}}));
signupRouter.post(
    "/", 
    signupValidationRules,
    handleValidationErrors("signup"),
    signupController.signUp
);
signupRouter.get("/membership", (req, res) => res.render("membership", {errors: [], values: {}}));
signupRouter.post(
    "/membership", 
    membershipValidationRules,
    handleValidationErrors("membership"),
    signupController.joinMembership
);

module.exports = signupRouter;
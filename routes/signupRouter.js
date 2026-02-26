const {Router} = require("express");
const {body, validationResult} = require("express-validator");
const signupRouter = Router();
const signupController = require("../controllers/signupController");
const {signupValidationRules, handleValidationErrors} = require("../controllers/validators");
const db = require("../db/queries");


signupRouter.get("/", (req, res) => res.render("signup", {errors: [], values: {}}));
signupRouter.post(
    "/", 
    signupValidationRules,
    handleValidationErrors("signup"),
    signupController.signUp
);

module.exports = signupRouter;
const {body, validationResult} = require("express-validator");
const db = require("../db/queries");

const signupValidationRules = [
    body("first_name")
        .trim()
        .notEmpty().withMessage("First name required")
        .isLength({max: 255}).withMessage("First name cannot be greater than 255 characters"),
    body("last_name")
        .trim()
        .notEmpty().withMessage("Last name required")
        .isLength({max: 255}).withMessage("First name cannot be greater than 255 characters"),
    body("username")
        .trim()
        .notEmpty().withMessage("Username required")
        .custom(async value => {
            const user = await db.findUserByUsername(value);
            if (user) {
                throw new Error("username already in use");
            };
        }),
    body("password")
        .isLength({min: 6}).withMessage("Password must be at least 8 characters long")
];

const handleValidationErrors = (viewName) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render(viewName, {
            errors: errors.array(),
            values: req.body
        });
    }
    next();
};

module.exports={
    signupValidationRules,
    handleValidationErrors
}
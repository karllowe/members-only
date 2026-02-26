const {body, validationResult} = require("express-validator");
const db = require("../db/queries");

const signupValidationRules = [
    body("username")
        .custom(async value => {
            const user = await db.findUserByUsername(value);
            if (user) {
                throw new Error("username already in use");
            };
        })
];

const handleValidationErrors = (viewName) => (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("signup", {
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
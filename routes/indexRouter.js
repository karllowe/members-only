const {Router} = require("express");
const passport = require("passport");
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index"));
indexRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/signup/membership",
    failureRedirect: "/"
}));
indexRouter.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/")
    })
})

module.exports = indexRouter;
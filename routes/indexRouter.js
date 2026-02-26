const {Router} = require("express");
const passport = require("passport");
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index", {user: req.user}));
indexRouter.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
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
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render("../errors/noAccess")
    }
}

module.exports.isMember = (req, res, next) => {
    if (req.isAuthenticated && req.user.is_member === true) {
        next();
    } else {
        res.render("membership", {errors: [], values: {}})
    }
}
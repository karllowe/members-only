const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function signUp(req, res) {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,10);
    const isAdmin = req.body.is_admin === "on";

    await db.signUpUser(firstName, lastName, username, password, isAdmin);
    res.redirect("/")
}

async function joinMembership(req, res) {
    const userId = req.user.id;
    await db.updateMembership(userId);
    res.redirect("/messages")
}

module.exports = {
    signUp,
    joinMembership
}
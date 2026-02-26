const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function signUp(req, res) {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,10);

    await db.signUpUser(firstName, lastName, username, password);
    res.redirect("/")
}

async function joinMembership(req, res) {
    const userId = req.body.id;
    await db.updateMembership(userId);
    res.redirect("/")
}

module.exports = {
    signUp,
    joinMembership
}
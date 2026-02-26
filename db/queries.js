const pool = require("./pool");

async function signUpUser(firstName, lastName, username, password) {
    try {
        await pool.query("INSERT INTO users (first_name, last_name, username, is_member, password) VALUES ($1, $2, $3, $4, $5)", [
            firstName,
            lastName,
            username,
            true,
            password
        ]);
    } catch (err) {
        return next(err);
    }
};

module.exports= {
    signUpUser
}
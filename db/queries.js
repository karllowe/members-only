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

async function findUserByUsername(username) {
    const { rows } = await pool.query("SELECT username FROM users WHERE username = $1", [username]);
    return rows[0];
}

module.exports= {
    signUpUser,
    findUserByUsername
}
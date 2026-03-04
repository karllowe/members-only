const pool = require("./pool");

async function signUpUser(firstName, lastName, username, password) {
    try {
        await pool.query("INSERT INTO users (first_name, last_name, username, is_member, password) VALUES ($1, $2, $3, $4, $5)", [
            firstName,
            lastName,
            username,
            false,
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

async function getMembershipCode() {
    const {rows} = await pool.query("SELECT joining_code from membership_key");
    return rows[0]?.joining_code;
}

async function updateMembership(id) {
    try {
        await pool.query("UPDATE users SET is_member = true WHERE id = $1", [id])
    } catch (err) {
        return next(err)
    }
}

async function getMessages() {
    const {rows} =  await pool.query("SELECT messages.id as message_id, messages.title, messages.message, messages.time, users.id as user_id, users.username FROM messages INNER JOIN users on messages.user_id = users.id");
    return rows
}

async function postMessage(title, message, time, user_id) {
    await pool.query("INSERT INTO messages (title, message, time, user_id) VALUES ($1, $2, $3, $4)", [title, message, time, user_id])
}

async function deleteMessage(messageId) {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId])
}

module.exports= {
    signUpUser,
    findUserByUsername,
    getMembershipCode,
    updateMembership,
    getMessages,
    postMessage,
    deleteMessage
}
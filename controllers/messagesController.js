const db = require("../db/queries");

async function getAllMessages() {
    const messages = await db.getMessages();
    return messages
};


async function getMessagePage(req, res) {
    const messages = await getAllMessages();
    res.render("messages", {messages})
}


module.exports = {
    getMessagePage
}
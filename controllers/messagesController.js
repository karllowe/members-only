const db = require("../db/queries");

async function getAllMessages() {
    const messages = await db.getMessages();
    return messages
};


async function getMessagePage(req, res) {
    const messages = await getAllMessages();
    res.render("messages", {messages})
}

async function postNewMessage(req, res) {
    const title = req.body.title;
    const message = req.body.message;
    const time = new Date();
    const userID = req.user.id;

    await db.postMessage(title, message, time, userID);
    res.redirect("/messages")
}

async function deleteMessage(req, res) {
    const messageId = req.params.id;
    await db.deleteMessage(messageId);
    res.redirect("/messages")
}

module.exports = {
    getMessagePage,
    postNewMessage,
    deleteMessage
}
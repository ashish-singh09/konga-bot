const { Probot } = require("probot");
const probotApp = require("../probot/index.js");

const webhookSecret = process.env.WEBHOOK_SECRET; // Replace with your actual webhook secret

const probot = new Probot({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    secret: webhookSecret,
});
(async () => {
    await probot.load(probotApp);
})();

module.exports = { probot }; //export probot instance to other files
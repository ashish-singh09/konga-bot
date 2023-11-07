const crypto = require('crypto');
const webhookSecret = process.env.WEBHOOK_SECRET; // Replace with your actual webhook secret
const { probot } = require('../configs/probot.js');
const { handleInstall } = require('../lib/user.manage.js');



const handleWebhook = async (req, res) => {

    const signature = req.get('x-hub-signature');
    const event = req.get('x-github-event');
    const payload = JSON.stringify(req.body);

    const secretBuffer = Buffer.from(webhookSecret, 'utf-8');
    const hmac = crypto.createHmac('sha1', secretBuffer);
    const computedSignature = 'sha1=' + hmac.update(payload).digest('hex');

    if (signature === computedSignature) {
        // Webhook is authenticated, handle the event

        if (event === 'issues') {
            commentIssue(req, res);
        } else if (event === 'installation' && req.body.action === 'created') {
            handleInstall(req, res);
        } else {
            res.status(200).send("ok");
        }
    } else {
        // Webhook is not authenticated
        res.status(403).send('Webhook authentication failed.');
    }
};

const commentIssue = (req, res) => {
    const id = req.get('x-github-delivery');
    const event = req.get('x-github-event');

    let webhookResponse = {
        "name": event,
        "id": id,
        "payload": req.body,
        "octokit": {
            "log": {
                "levels": {
                    "labels": {
                        "10": "trace",
                        "20": "debug",
                        "30": "info",
                        "40": "warn",
                        "50": "error",
                        "60": "fatal"
                    },
                    "values": {
                        "trace": 10,
                        "debug": 20,
                        "info": 30,
                        "warn": 40,
                        "error": 50,
                        "fatal": 60
                    }
                },
                "version": "6.14.0",
                "level": "info",
                "levelVal": 30,
                "_eventsCount": 0
            },
            "retry": {},
            "actions": {},
            "activity": {},
            "apps": {},
            "billing": {},
            "checks": {},
            "codeScanning": {},
            "codesOfConduct": {},
            "codespaces": {},
            "dependabot": {},
            "dependencyGraph": {},
            "emojis": {},
            "enterpriseAdmin": {},
            "gists": {},
            "git": {},
            "gitignore": {},
            "interactions": {},
            "issues": {},
            "licenses": {},
            "markdown": {},
            "meta": {},
            "migrations": {},
            "orgs": {},
            "packages": {},
            "projects": {},
            "pulls": {},
            "rateLimit": {},
            "reactions": {},
            "repos": {},
            "search": {},
            "secretScanning": {},
            "teams": {},
            "users": {},
            "rest": {
                "actions": {},
                "activity": {},
                "apps": {},
                "billing": {},
                "checks": {},
                "codeScanning": {},
                "codesOfConduct": {},
                "codespaces": {},
                "dependabot": {},
                "dependencyGraph": {},
                "emojis": {},
                "enterpriseAdmin": {},
                "gists": {},
                "git": {},
                "gitignore": {},
                "interactions": {},
                "issues": {},
                "licenses": {},
                "markdown": {},
                "meta": {},
                "migrations": {},
                "orgs": {},
                "packages": {},
                "projects": {},
                "pulls": {},
                "rateLimit": {},
                "reactions": {},
                "repos": {},
                "search": {},
                "secretScanning": {},
                "teams": {},
                "users": {}
            },
            config: {}
        }
    };

    probot.webhooks.receive(webhookResponse);
    res.status(200).send("ok");
}

module.exports = {
    handleWebhook,
};
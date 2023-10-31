require("dotenv").config();

const { Probot } = require("probot");
const app = require("./index.js");
const express = require("express");
const crypto = require('crypto');

const myApp = express();
myApp.use(express.json());

const webhookSecret = process.env.WEBHOOK_SECRET;

const probot = new Probot({
    appId: process.env.APP_ID,
    privateKey: process.env.PRIVATE_KEY,
    secret: webhookSecret,
});

async function example() {
    await probot.load(app);
}

example();


myApp.get("/hello", (req, res) => {
    // probot.webhooks.receive({ id: "123", name: "issues", payload: { action: "opened" } });
    res.send("Hello World");
});

myApp.post("/webhook", async (req, res) => {
    console.log("Webhook received");

    const signature = req.get('x-hub-signature');
    const id = req.get('x-github-delivery');
    const event = req.get('x-github-event');
    const payload = JSON.stringify(req.body);

    const secretBuffer = Buffer.from(webhookSecret, 'utf-8');
    const hmac = crypto.createHmac('sha1', secretBuffer);
    const computedSignature = 'sha1=' + hmac.update(payload).digest('hex');

    if (signature === computedSignature) {
        // Webhook is authenticated, handle the event
        // Your event handling code goes here

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

        // probot.webhooks.receive({
        //     "name": event,
        //     "id": id,
        //     "payload": req.body,
        //     "octokit": {
        //         "log": {
        //             "levels": {
        //                 "labels": {
        //                     "10": "trace",
        //                     "20": "debug",
        //                     "30": "info",
        //                     "40": "warn",
        //                     "50": "error",
        //                     "60": "fatal"
        //                 },
        //                 "values": {
        //                     "trace": 10,
        //                     "debug": 20,
        //                     "info": 30,
        //                     "warn": 40,
        //                     "error": 50,
        //                     "fatal": 60
        //                 }
        //             },
        //             "version": "6.14.0",
        //             "level": "info",
        //             "levelVal": 30,
        //             "_eventsCount": 0
        //         },
        //         "retry": {},
        //         "actions": {},
        //         "activity": {},
        //         "apps": {},
        //         "billing": {},
        //         "checks": {},
        //         "codeScanning": {},
        //         "codesOfConduct": {},
        //         "codespaces": {},
        //         "dependabot": {},
        //         "dependencyGraph": {},
        //         "emojis": {},
        //         "enterpriseAdmin": {},
        //         "gists": {},
        //         "git": {},
        //         "gitignore": {},
        //         "interactions": {},
        //         "issues": {},
        //         "licenses": {},
        //         "markdown": {},
        //         "meta": {},
        //         "migrations": {},
        //         "orgs": {},
        //         "packages": {},
        //         "projects": {},
        //         "pulls": {},
        //         "rateLimit": {},
        //         "reactions": {},
        //         "repos": {},
        //         "search": {},
        //         "secretScanning": {},
        //         "teams": {},
        //         "users": {},
        //         "rest": {
        //             "actions": {},
        //             "activity": {},
        //             "apps": {},
        //             "billing": {},
        //             "checks": {},
        //             "codeScanning": {},
        //             "codesOfConduct": {},
        //             "codespaces": {},
        //             "dependabot": {},
        //             "dependencyGraph": {},
        //             "emojis": {},
        //             "enterpriseAdmin": {},
        //             "gists": {},
        //             "git": {},
        //             "gitignore": {},
        //             "interactions": {},
        //             "issues": {},
        //             "licenses": {},
        //             "markdown": {},
        //             "meta": {},
        //             "migrations": {},
        //             "orgs": {},
        //             "packages": {},
        //             "projects": {},
        //             "pulls": {},
        //             "rateLimit": {},
        //             "reactions": {},
        //             "repos": {},
        //             "search": {},
        //             "secretScanning": {},
        //             "teams": {},
        //             "users": {}
        //         },
        //         "config": {}
        //     }
        // });
        probot.webhooks.receive(webhookResponse);

        res.status(200).send('ok');
    } else {
        // Webhook is not authenticated
        res.status(403).send('Webhook authentication failed.');
    }
});

myApp.get("/", (req, res) => {
    res.send("Hello World");
});

myApp.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);
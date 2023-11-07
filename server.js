require("dotenv").config();

const express = require("express");
const webhook = require("./routes/webhooks.js");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//api routes
app.use("/webhook", webhook)

app.get("/", (req, res) => {
    res.send("Hello World");
});


// start the server listening for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});
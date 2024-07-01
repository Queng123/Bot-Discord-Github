const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.login(DISCORD_TOKEN);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/github-webhook', (req, res) => {
    try {
        const payload = req.body;

        if (payload.action === 'opened') {
            const prTitle = payload.pull_request.title;
            const prUrl = payload.pull_request.html_url;
            const message = `@everyone Nouvelle Pull Request: [${prTitle}](${prUrl})`;

            client.channels.fetch(CHANNEL_ID)
                .then(channel => channel.send(message))
                .catch(error => {
                    console.error('Error sending message to Discord:', error);
                    res.status(500).send('Error processing webhook.');
                });
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error processing webhook request:', error);
        res.status(400).send('Invalid webhook request.');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

module.exports = app;

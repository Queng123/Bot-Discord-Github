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


app.post('/github-webhook', async (req, res) => {
    try {
        const payload = req.body;

        if (payload.action === 'opened') {
            const prTitle = payload.pull_request.title;
            const prUrl = payload.pull_request.html_url;
            const message = `@everyone New Pull Request: [${prTitle}](${prUrl})`;

            const channel = await client.channels.fetch(CHANNEL_ID);
            await channel.send(message);

            res.sendStatus(200);
        } else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.error('Error processing webhook request:', error);
        res.status(500).send('Error processing webhook.');
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;

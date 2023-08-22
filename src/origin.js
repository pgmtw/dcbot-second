// this is the prototype of other js script for copying
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const my_client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

my_client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});

my_client.login(process.env.TOKEN);
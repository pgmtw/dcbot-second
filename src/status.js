// change status of bot-itself
require('dotenv').config()
const { Client, IntentsBitField, ActivityType } = require('discord.js')

const my_client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// an array of object, each object is an status
// the status type could be Streaming, Watching, or Listening
let status = [
    {
        name: `小劉會客室`,
        type: ActivityType.Streaming,
        url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, // could only be a YouTube or Twitch link, YouTube url should have `watch?`
    },
    {
        name: `排球少年`,
        type: ActivityType.Watching,
    },
    {
        name: `國歌`,
        type: ActivityType.Listening,
    }
]

// set status while bot is ready
my_client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        my_client.user.setActivity(status[0]);
    }, 10000);
});

my_client.login(process.env.TOKEN);
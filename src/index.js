require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')
// Client is the instence of our bot, type of class
// distructure
// intents are a set of permissions that your bot can use in order to get access a set of events
// intents list: [https://discordjs.guide/popular-topics/intents.html#privileged-intents]
const my_client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// on() method is an event listener, the first parameters is a event
my_client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
})
// on() with 'messageCreate' parameter triggered when the message send that bot can see
my_client.on('messageCreate', (message) => {
    // bot cannot distinguish between human and bot, so we need next line
    if (message.author.bot) return
    if (message.content === 'hello') {
        message.reply('hello')
    }
})

my_client.login(process.env.TOKEN)

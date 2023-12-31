// client is the instence of our bot, type of class
// discor.js Client extends node:events EventEmmiter
// distructure
// intents are a set of permissions that your bot can use in order to get access a set of events
// intents list: [https://discordjs.guide/popular-topics/intents.html#privileged-intents]

require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js')
const my_client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// using node:events emmiter.on() method
my_client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
})

my_client.on('messageCreate', (message) => {
    // bot cannot distinguish between human and bot, so we need next line
    if (message.author.bot) return
    if (message.content === 'I want a embed') {
        const my_embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('description of embed from message content')
            .setColor('Green')
            .addFields({
                name: 'Field title',
                value: 'value in the first field',
            }
            );

        message.channel.send({ embeds: [my_embed]});
            
    }

    if (message.content === 'hello') {
        message.reply('hello')
    }
});

my_client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'requiring-embed') {
        const my_embed = new EmbedBuilder()
            .setTitle('Some Title')
            .setDescription('Some random description')
            .setColor('Orange')
            .addFields({
                name: 'Field title',
                value: 'value in the first field',
                inline: true,
            }, {
                name: '2nd Field title',
                value: 'value in 2nd field',
                inline: true,
            }
            );

        interaction.reply({ embeds: [my_embed]});
            
    }

    if (interaction.commandName === 'hey') {
        interaction.reply('hey yourself!');
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('ping yourself!');
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number')?.value; // argument in get() has to match to the option-name in the command
        const num2 = interaction.options.get('second-number')?.value; 
        const answer = num1 + num2;
        interaction.reply(`The sum is ${answer}`);
    }
});

my_client.login(process.env.TOKEN);

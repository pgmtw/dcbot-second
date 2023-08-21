require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const my_bot = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1143234757233225800',
        label: 'Red' // the text on the button
    },
    {
        id: '1143235033751105589',
        label: 'Green'
    }
]

my_bot.on('ready', async (c) => {
    try {
        const channel = await my_bot.channels.cache.get('1143253754263650477'); // channel id
        if (!channel) return;
        
        // while having more than 5 roles, create a new raw for every five rols
        const row = new ActionRowBuilder();

        roles.forEach ((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Claim or remove the role below.',
            components: [row], // array of all the different rows, each row can have a maximum 5 buttons
        });

        process.exit();
    } catch (error) {
        console.log(error);
    }
});

my_bot.login(process.env.TOKEN);
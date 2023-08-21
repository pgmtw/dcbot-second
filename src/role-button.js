require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");

const my_bot = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

my_bot.on('ready', (c) => {
    console.log(`using role-button.js, the ${c.user.tag} is online.\n`);
});

my_bot.on('interactionCreate', async (interaction) => {
    try {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ephemeral: true});
    
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if(!role) {
            interaction.editReply({
                content: "I couldn't find that role",
            })
            return;
        }
    
        const hasRole = interaction.member.roles.cache.has(role.id);
    
        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The role ${role} has been removed.`);
            return;
        }
    
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);
    
    } catch (error) {
        console.log(error);
    }
});

my_bot.login(process.env.TOKEN);
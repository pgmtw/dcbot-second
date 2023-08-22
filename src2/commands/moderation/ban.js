const { ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: Boolean,

    options: [
        {
            name: 'target-user',
            description: 'The user to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'The reason to ban the user.',
            type: ApplicationCommandOptionType.String,
        },
    ],

    permissionsRequired: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`ban ..`);
    },
};
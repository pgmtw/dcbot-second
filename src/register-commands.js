require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

// and array of objects, every object represents a single commmand
const commands = [
    { // first slash command
        name: 'hey',
        description: 'Replies with hey',
    },
    {
        name: 'ping',
        description: 'Replies with pnig',
    },
    { // slash commands with options
        name: 'add',
        description: 'Adds two numbers.',
        options: [
          { // name of options should be lower case and no space
            name: 'first-number',
            description: 'The first number.',
            type: ApplicationCommandOptionType.Number,
            // make sure the value in `choices` match to `type`
            choices: [ 
                {
                    name: 'one',
                    value: 1,
                },
                {
                    name: 'two',
                    value: 2,
                },
                {
                    name: 'three',
                    value: 3,
                },
            ],
            required: true,
          },
          {
            name: 'second-number',
            description: 'The second number.',
            type: ApplicationCommandOptionType.Number,
            required: true,
          },   
        ],
    },
    { // embed command
        name: 'requiring-embed',
        description: 'Sends an embed.',
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,
                process.env.GUILD_ID),
                { body: commands}
        )

        console.log('Slash commands were registered succesfully!')
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();
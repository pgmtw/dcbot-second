const path = require('path');
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);
    
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a,b) => a > b);

        // using regex to replace windows backslash to node executable forward slash
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        
        // execute all the methods of all js file
        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles){
                const eventFuction = require(eventFile);
                await eventFuction(client, arg);
            }
        });
    }
};
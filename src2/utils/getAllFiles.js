const fs = require('fs'); // what is fs?
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, { withFileTypes: true}) // withFileTypes: True could distinguish between files and folders

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if(foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        }
        else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
};
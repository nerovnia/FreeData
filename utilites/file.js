/******************************************************
 * Module: Functions for working with file
 ******************************************************
 * For project: Free Data
 * Volodymyr Nerovnia (c) 2023
 ******************************************************
 * Under MIT license
 ******************************************************/

const fs = require('fs');
const path = require('path');

/******************************************************
 * Save file to directory
 ******************************************************
 * @name fillPersonAdditionalParams
 * @param pathToFile - path to file
 * @param filename - name of the file
 * @param content - JSON content
 */
function saveFile(pathToFile, filename, content) {
  fs.writeFile(path.join(pathToFile, filename), content, err => {
    if (err) {
      console.error(err);
    }
    console.log(`${filename} file written successfully`);
  });
}

module.exports = { saveFile };

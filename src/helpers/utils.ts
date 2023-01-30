   /*
 * Utilities
 */
import * as fs from 'fs';
import * as shell from 'shelljs';


export const utils = {

/*
* Writes the given string into a text file. The path is created if it does not exist
*/
 writeFile: function(fileName, str) {
// Create the path if required
// eslint-disable-next-line prefer-const
let temp = fileName.split('/');
temp.splice(temp.length-3, 3);
utils.mkdirp(temp.join('/dist/storage/'));
fs.writeFileSync(fileName, str);
},

/*
* Create the given path, if it does not exist
*/
 mkdirp: function(fullPath) {
shell.mkdir('-p', fullPath);
},

/*
* Deletes the specified file
*/
 deleteFile: function(fileName) {
if(fs.existsSync(fileName)) fs.unlinkSync(fileName);
}


}
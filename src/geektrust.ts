import * as fs from 'fs';
import { mainProgram } from './helpers/mainProgram-helper';
import { utils } from './helpers/utils';
import { Subscribed_services } from './storage/storage';



Subscribed_services.reset();
utils.deleteFile('./dist/storage/storage.json');



const filename = process.argv[2];
    fs.readFile(filename, "utf8", (err, data) => {
        if (err) throw err;
    
        const input_from_File: string = data.toString();
        mainProgram.runProgram(input_from_File);
    
});







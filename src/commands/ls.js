import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
import showDirectory from '../utils/showDirectory.js';

async function executeLs(){
    // List all files and folder in current directory and print it to console
    
    const list = await fs.readdir(currentDirectory.path);
    console.log(list);
    showDirectory();
}
export default executeLs;
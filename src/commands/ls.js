import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
async function executeLs(){
    // List all files and folder in current directory and print it to console
    console.log('executeLs WORK');
    const list = await fs.readdir(currentDirectory.path);
    console.log(list);
}
export default executeLs;
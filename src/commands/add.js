import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
import showDirectory from '../utils/showDirectory.js';
import path from 'path';

async function executeAdd(fileName) {
    // Create empty file in current working directory:
    const pathToFile = path.join(currentDirectory.path, fileName);
    try{
        await fs.access(pathToFile);
        console.log("The file already exist")
        console.log("Operation failed")
    } catch(err){
        await fs.writeFile(pathToFile, "", {flag:'wx'})
        showDirectory();
    }
}

export default executeAdd;
import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
import getFullPath from './getFullPath.js';

async function executeCd(pathToFolder){
    const fullPath = await getFullPath(pathToFolder);
    const stat = await fs.stat(fullPath);
    if(stat.isFile()){
        throw new Error();
    }
    currentDirectory.path = fullPath;
}

export default executeCd;
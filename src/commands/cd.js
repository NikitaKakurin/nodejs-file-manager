import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
import getFullPath from '../utils/getFullPath.js';
import showDirectory from '../utils/showDirectory.js';

async function executeCd(pathToFolder){
    // Go to dedicated folder from current directory 
    // (path_to_directory can be relative or absolute)
    
    const fullPath = await getFullPath(pathToFolder);
    const stat = await fs.stat(fullPath);
    if(stat.isFile()){
        throw new Error();
    }
    currentDirectory.path = fullPath;
    showDirectory()
}

export default executeCd;
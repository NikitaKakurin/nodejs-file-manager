import * as fs from 'fs/promises';
import showDirectory from './showDirectory.js';
import path from 'path';
import getFullPath from './getFullPath.js';
import splitTwoArgs from './splitTwoArgs.js'

async function executeRn(arg){
    const arrFromArg = splitTwoArgs(arg);
    const pathToFile = arrFromArg[0];
    const newFileName = arrFromArg[1]
    const fullPath = await getFullPath(pathToFile);
    const stat = await fs.stat(fullPath);
    if(stat.isDirectory()){
        throw new Error();
    }
    const lastSeparatorIndex = fullPath.lastIndexOf(path.sep);
    const newFullPath = fullPath.slice(0,lastSeparatorIndex+1) + newFileName;
    await fs.rename(fullPath, newFullPath);
    showDirectory();
    return;
}

export default executeRn;


import * as fs from 'fs/promises';
import showDirectory from '../utils/showDirectory.js';
import path from 'path';
import getFullPath from '../utils/getFullPath.js';
import splitTwoArgs from '../utils/splitTwoArgs.js'
import isFileAlreadyExist from '../utils/isFileAlreadyExist.js';

async function executeRn(arg){
    // Rename file
    const arrFromArg = splitTwoArgs(arg);
    const pathToFile = arrFromArg[0];
    const newFileName = arrFromArg[1]
    const fullPath = await getFullPath(pathToFile);
    const stat = await fs.stat(fullPath);
    if(stat.isDirectory()){
        throw new Error();
    }
    const dir = path.parse(fullPath).dir;
    const newFullPath = path.join(dir, newFileName);

    if(await isFileAlreadyExist(newFullPath)){
        return;
    };

    await fs.rename(fullPath, newFullPath);
    showDirectory();
    return;
}

export default executeRn;


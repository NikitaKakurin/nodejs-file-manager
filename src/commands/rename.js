import * as fs from 'fs/promises';
import showDirectory from './showDirectory.js';
import path from 'path';
import getFullPath from './getFullPath.js';
import splitTwoArgs from './splitTwoArgs.js'

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
    try{
        await fs.access(newFullPath);
        console.log("The file already exist in " + newFullPath)
        console.log("Operation failed")
        return;
    } catch(err){}
    await fs.rename(fullPath, newFullPath);
    showDirectory();
    return;
}

export default executeRn;


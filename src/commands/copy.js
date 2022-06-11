import * as fsPromise from 'fs/promises';
import showDirectory from './showDirectory.js';
import path from 'path';
import getFullPath from './getFullPath.js';
import splitTwoArgs from './splitTwoArgs.js'
import copyFile from "./copyFile.js";

async function executeCp(arg){
    // Copy file 
    const arrFromArg = splitTwoArgs(arg);
    const pathToFile = arrFromArg[0];
    const pathToTargetFolder= arrFromArg[1];
    let fullPathToFile = await getFullPath(pathToFile);
    let fullPathToTargetFolder = await getFullPath(pathToTargetFolder)
    const fileName = path.parse(fullPathToFile).base;
    const pathToNewFile  = path.join(fullPathToTargetFolder, fileName);

    try{
        await fsPromise.access(pathToNewFile);
        console.log("The file already exist in " + pathToNewFile)
        console.log("Operation failed")
        return;
    } catch(err){}
    await copyFile(fullPathToFile,
                    pathToNewFile,
                    showDirectory);
    return;
}

export default executeCp;
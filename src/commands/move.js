import showDirectory from './showDirectory.js';
import splitTwoArgs from './splitTwoArgs.js';
import * as fs from 'fs/promises';
import getFullPath from './getFullPath.js';
import copyFile from './copyFile.js';
import path from 'path';


async function executeMv(arg) {

    const arrFromArg = splitTwoArgs(arg);
    const pathToFile = arrFromArg[0];
    const pathToTargetFolder= arrFromArg[1];
    let fullPathToFile = await getFullPath(pathToFile);
    let fullPathToTargetFolder = await getFullPath(pathToTargetFolder)
    const pathToSourceFile = splitTwoArgs(arg)[0];
    const fileName = path.parse(fullPathToFile).base;
    const pathToNewFile  = path.join(fullPathToTargetFolder, fileName);

    try{
        await fs.access(pathToNewFile);
        console.log("The file already exist in " + pathToNewFile)
        console.log("Operation failed")
        return;
    } catch(err){}

    await copyFile(fullPathToFile,
                    pathToNewFile,
                    deleteFile);

    async function deleteFile(){
        await fs.unlink(fullPathToFile);
        showDirectory();
    }

    return;
}

export default executeMv;
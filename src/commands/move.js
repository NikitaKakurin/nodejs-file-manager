import showDirectory from '../utils/showDirectory.js';
import splitTwoArgs from '../utils/splitTwoArgs.js';
import * as fs from 'fs/promises';
import getFullPath from '../utils/getFullPath.js';
import copyFile from '../utils/copyfile.js';
import path from 'path';


async function executeMv(arg) {
    // Move file (same as copy but initial file is deleted):
    // mv path_to_file path_to_new_directory
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
        console.log('The file is moved');
        showDirectory();
    }

    return;
}

export default executeMv;
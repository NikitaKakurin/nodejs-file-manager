import showDirectory from '../utils/showDirectory.js';
import splitTwoArgs from '../utils/splitTwoArgs.js';
import * as fs from 'fs/promises';
import getFullPath from '../utils/getFullPath.js';
import copyFile from '../utils/copyfile.js';
import path from 'path';
import isFileAlreadyExist from '../utils/isFileAlreadyExist.js';

async function executeMv(arg) {
    // Move file (same as copy but initial file is deleted):
    // mv path_to_file path_to_new_directory
    const arrFromArg = splitTwoArgs(arg);
    const pathToFile = arrFromArg[0];
    const pathToTargetFolder= arrFromArg[1];
    const fullPathToFile = await getFullPath(pathToFile);
    const fullPathToTargetFolder = await getFullPath(pathToTargetFolder)
    const fileName = path.parse(fullPathToFile).base;
    const pathToNewFile  = path.join(fullPathToTargetFolder, fileName);

    if(await isFileAlreadyExist(pathToNewFile)){
        return;
    };

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
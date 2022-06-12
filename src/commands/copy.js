import * as fsPromise from 'fs/promises';
import showDirectory from '../utils/showDirectory.js';
import path from 'path';
import getFullPath from '../utils/getFullPath.js';
import splitTwoArgs from '../utils/splitTwoArgs.js'
import copyFile from "../utils/copyfile.js";
import isFileAlreadyExist from '../utils/isFileAlreadyExist.js';

async function executeCp(arg){
    try{
                // Copy file 
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
                        finishCopy);

        function finishCopy(){
            console.log('The file is copied');
            showDirectory();
        }

        return;
        
    } catch (err){
      if(err){
        throw new Error('Operation failed');
      }
    }
}


export default executeCp;
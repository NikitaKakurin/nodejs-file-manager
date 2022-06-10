import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
import path from 'path';

async function getFullPath(pathToTarget){
    let fullPath;

    if(path.isAbsolute(pathToTarget)){

        if(pathToTarget.includes(':')){
            fullPath = path.join(pathToTarget)
        } else{
            const firstSepIndex = currentDirectory.path.indexOf(path.sep);
            const localDisc = currentDirectory.path.slice(0, firstSepIndex);
            fullPath = path.join(localDisc, pathToTarget);
        }

    }else {
        fullPath = path.join(currentDirectory.path, pathToTarget);
    }

    const realPath = await fs.realpath(fullPath);

    return realPath;
}

export default getFullPath;
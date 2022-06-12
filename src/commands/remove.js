import * as fs from 'fs/promises';
import showDirectory from '../utils/showDirectory.js';
import getFullPath from '../utils/getFullPath.js';

async function executeRm(pathToFile){
    const fullPath = await getFullPath(pathToFile);
    await fs.unlink(fullPath);
    showDirectory();
    return;
}

export default executeRm;
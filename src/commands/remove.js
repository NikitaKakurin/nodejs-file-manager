import * as fs from 'fs/promises';
import showDirectory from '../utils/showDirectory.js';
import getFullPath from '../utils/getFullPath.js';

async function executeRm(pathToFile){
    // delete file
    const fullPath = await getFullPath(pathToFile);
    await fs.unlink(fullPath);
    console.log('the file is deleted');
    showDirectory();
    return;
}

export default executeRm;
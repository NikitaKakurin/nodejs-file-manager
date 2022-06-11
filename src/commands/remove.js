import * as fs from 'fs/promises';
import showDirectory from './showDirectory.js';
import path from 'path';
import getFullPath from './getFullPath.js';

async function executeRm(pathToFile){
    const fullPath = await getFullPath(pathToFile);
    await fs.unlink(fullPath);
    showDirectory();
    return;
}

export default executeRm;
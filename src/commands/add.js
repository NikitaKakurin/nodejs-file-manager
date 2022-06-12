import * as fs from 'fs/promises';
import { currentDirectory } from '../file-manager.mjs';
import showDirectory from '../utils/showDirectory.js';
import path from 'path';
import isFileAlreadyExist from '../utils/isFileAlreadyExist.js';

async function executeAdd(fileName) {
  // Create empty file in current working directory:
  const pathToFile = path.join(currentDirectory.path, fileName);
  
  if(await isFileAlreadyExist(pathToFile)){
      return;
  };

  await fs.writeFile(pathToFile, "", {flag:'wx'})
  console.log('the file is added')
  showDirectory();
}

export default executeAdd;
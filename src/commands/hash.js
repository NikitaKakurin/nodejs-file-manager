import fs from 'fs';
import crypto from 'crypto';
import getFullPath from '../utils/getFullPath.js';
import showDirectory from '../utils/showDirectory.js';


async function calcHash(pathToFile) {
  // Calculate hash for file and print it into console
  const fullPath = await getFullPath(pathToFile);
  const readableStream = fs.createReadStream(fullPath, 'utf-8');
  let data = '';

  for await( let chunk of readableStream){
     data += chunk;
  }
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  console.log(hash);
  showDirectory();
};

export default calcHash;
import fs from 'fs';
import crypto from 'crypto';
import getFullPath from './getFullPath.js';
import showDirectory from './showDirectory.js';


async function calcHash(pathToFile) {
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
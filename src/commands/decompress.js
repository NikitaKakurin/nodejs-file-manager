import * as fsPromise from 'fs/promises';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import getFullPath from './getFullPath.js';
import showDirectory from './showDirectory.js';
import splitTwoArgs from './splitTwoArgs.js';

async function decompress(arg) {

    const arrFromArg = splitTwoArgs(arg);
    const pathToArch = arrFromArg[0];
    const pathToTarget= arrFromArg[1];
    const fullPathToArch = await getFullPath(pathToArch);
    const fullPathToTarget = await getFullPath(pathToTarget);
    
    try{
        await fsPromise.access(fullPathToTarget);
        console.log("The file already exist in " + fullPathToTarget)
        console.log("Operation failed")
        return;
    } catch(err){}

  const readableStream = fs.createReadStream(fullPathToArch);
  const writeableStream = fs.createWriteStream(fullPathToTarget, {flag: 'w+'});
  const unzip = zlib.createBrotliDecompress();

  writeableStream.on('finish',() => {
    console.log('the file is unzipped')
    showDirectory();
  })

  
  pipeline(
    readableStream,
    unzip,
    writeableStream,
    (err) => {
      if (err) {
        console.log('operation failed');
      }
    }
  )
};

export default decompress;
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import getFullPath from '../utils/getFullPath.js';
import showDirectory from '../utils/showDirectory.js';
import splitTwoArgs from '../utils/splitTwoArgs.js';
import isFileAlreadyExist from '../utils/isFileAlreadyExist.js';

async function decompress(arg) {
  // Decompress file (using Brotli algorithm)
  // decompress path_to_file path_to_destination(with filename)
  const arrFromArg = splitTwoArgs(arg);
  const pathToArch = arrFromArg[0];
  const pathToTarget= arrFromArg[1];
  const fullPathToArch = await getFullPath(pathToArch);
  const fullPathToTarget = await getFullPath(pathToTarget);
    
  if(await isFileAlreadyExist(fullPathToTarget)){
    return;
  };

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
        console.log('Operation failed');
      }
    }
  )
};

export default decompress;
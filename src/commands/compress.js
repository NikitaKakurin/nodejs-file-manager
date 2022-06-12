import * as fsPromise from 'fs/promises';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import getFullPath from '../utils/getFullPath.js';
import showDirectory from '../utils/showDirectory.js';
import splitTwoArgs from '../utils/splitTwoArgs.js';
import isFileAlreadyExist from '../utils/isFileAlreadyExist.js';

async function compress(arg) {
  // Compress file (using Brotli algorithm)
  // compress path_to_file path_to_destination(with archive name)
  
  const arrFromArg = splitTwoArgs(arg);
  const pathToFile = arrFromArg[0];
  const pathToArch= arrFromArg[1];
  const fullPathToFile = await getFullPath(pathToFile);
  const fullPathToArch = await getFullPath(pathToArch);

  if(await isFileAlreadyExist(fullPathToArch)){
    return;
  };

  const readableStream = fs.createReadStream(fullPathToFile,'utf-8');
  const writeableStream = fs.createWriteStream(fullPathToArch, {flag: 'w+'});
  const BrotliCompressStream = zlib.createBrotliCompress();

  writeableStream.on('finish',() => {
    console.log('the file is archived')
    showDirectory();
  })

  pipeline(
    readableStream,
    BrotliCompressStream,
    writeableStream,
    (err) => {
      if (err) {
        console.error('Operation failed');
      }
    }
  )
};

export default compress;
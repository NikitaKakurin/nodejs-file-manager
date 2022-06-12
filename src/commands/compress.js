import * as fsPromise from 'fs/promises';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path from 'path';
import getFullPath from '../utils/getFullPath.js';
import showDirectory from '../utils/showDirectory.js';
import splitTwoArgs from '../utils/splitTwoArgs.js';

async function compress(arg) {
  // Compress file (using Brotli algorithm)
  // compress path_to_file path_to_destination(with archive name)
  
    const arrFromArg = splitTwoArgs(arg);
    const pathToFile = arrFromArg[0];
    const pathToTargetFolder= arrFromArg[1];
    const fullPathToFile = await getFullPath(pathToFile);
    const fullPathToTargetFolder = await getFullPath(pathToTargetFolder);
    const fileName = path.parse(fullPathToFile).base;
    const pathToArchive  = fullPathToTargetFolder;
    
    try{
        await fsPromise.access(pathToArchive);
        console.log("The file already exist in " + pathToArchive)
        console.log("Operation failed")
        return;
    } catch(err){}

  const readableStream = fs.createReadStream(fullPathToFile,'utf-8');
  const writeableStream = fs.createWriteStream(pathToArchive, {flag: 'w+'});
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
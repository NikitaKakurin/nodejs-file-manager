import fs from 'fs';
import {pipeline} from 'stream';


async function copyFile(pathToSourceFile, pathToTargetFolder, cb) {
    const readStream = fs.createReadStream(pathToSourceFile, 'utf-8')
    const writeStream = fs.createWriteStream(pathToTargetFolder)
    // readStream.pipe(writeStream);

    writeStream.on('finish', () =>{
        cb();
    })

    pipeline(
        readStream,
        writeStream,
        (err) => {
            if (err) {
                console.log('Operation failed');
            }
        }
    )   
}


export default copyFile;
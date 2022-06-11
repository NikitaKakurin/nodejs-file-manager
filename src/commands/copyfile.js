import fs from 'fs';


async function copyFile(pathToSourceFile, pathToTargetFolder, cb) {
    const readStream = fs.createReadStream(pathToSourceFile, 'utf-8')
    const writeStream = fs.createWriteStream(pathToTargetFolder)
    readStream.pipe(writeStream);

    writeStream.on('finish', () =>{
        cb();
    })
}


export default copyFile;
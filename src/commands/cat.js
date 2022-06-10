import fs from 'fs';
import getFullPath from './getFullPath.js';
import showDirectory from './showDirectory.js';

async function executeCat(pathToFile) {
    const filePath = await getFullPath(pathToFile);
    const readStream = fs.createReadStream(filePath,'utf-8');

    readStream.on('data', (data) => {
        console.log(data);
    })

    readStream.on('end', () => {
        showDirectory();
    })

    readStream.on('error', ()=>{
        console.log('Operation failed')
    })
}

export default executeCat;




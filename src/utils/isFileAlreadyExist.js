import * as fs from 'fs/promises';

async function isFileAlreadyExist(pathToFile) {
    try{
        await fs.access(pathToFile);
        console.log("The file already exist in " + pathToFile)
        console.log("Operation failed")
        return true;
    } catch(err){
        return false;
    }
}
 export default isFileAlreadyExist;
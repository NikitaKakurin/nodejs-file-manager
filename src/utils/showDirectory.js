import { currentDirectory } from '../file-manager.mjs';

function showDirectory(){
    const directoryMessage = `You are currently in ${currentDirectory.path}`
    console.log(directoryMessage);
}

export default showDirectory;
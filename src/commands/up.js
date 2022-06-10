import { currentDirectory } from '../file-manager.mjs';
import path from 'path';
import showDirectory from './showDirectory.js';

async function executeUp(){
    // Go upper from current directory (when you are in the root folder 
    // this operation shouldn't change working directory)
  
    const separator = path.sep;
    const lastSepIndex = currentDirectory.path.lastIndexOf(separator);
  
    if(lastSepIndex>0){
      currentDirectory.path = currentDirectory.path.slice(0,lastSepIndex );
  
      if(currentDirectory.path.lastIndexOf(separator)===-1){
        currentDirectory.path += separator;
      }
      
    }
    showDirectory();  
    return;
}

export default executeUp;
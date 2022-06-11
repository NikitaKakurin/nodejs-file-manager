import showDirectory from './showDirectory.js';
import splitTwoArgs from './splitTwoArgs.js';
import {executeCp, executeRm} from './index.js';


async function executeMv(arg) {
    await executeCp(arg);
    const pathToSourceFile = splitTwoArgs(arg)[0];
    await executeRm(pathToSourceFile);
    showDirectory();
    return;
}

export default executeMv;
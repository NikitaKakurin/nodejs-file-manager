import os from 'os';
import showDirectory from './showDirectory.js';

async function executeOs(arg){
    if(arg==="cpus"){
        const cpus = getOsCpus();
        console.log(`Total cpus: ${cpus.length}`);
        console.log(cpus);
        showDirectory();
        return;
    }
    if(arg==="EOL"){
        const eol = getOsEOL();
        console.log(`default system End-Of-Line is ${eol}`)
        showDirectory();
        return;
    }
    if(arg==="homedir"){
        const homedir = getOsHomedir();
        console.log(`home directory is ${homedir}`)
        showDirectory();
        return;
    }
    if(arg==="username"){
        const username = getOsUsername();
        console.log(`username is ${username}`);
        showDirectory();
        return;
    }
    if(arg==="architecture"){
        const arch = getOsArch();
        console.log(`CPU architecture is ${arch}`);
        showDirectory();
        return;
    }
}

function getOsCpus(){
    // Get host machine CPUs info (overall amount
    // of CPUS plus model and clock rate (in GHz)
    //  for each of them)
    
    const cpus = os.cpus();
    const result = cpus.map(cpu => {
        return{
            model: cpu.model,
            speed: cpu.speed
        };
    })
    return result;
}

function getOsEOL(){
    // Get EOL (default system End-Of-Line)

    const eol = os.EOL==='\n'?'\\n': '\\r\\n';
    return eol;
}

function getOsHomedir(){
    // Get home directory:

    const homedir = os.homedir;
    return homedir;
}

function getOsUsername(){
//     Get current system user name 

    const username = os.userInfo().username;
    return username;
}

function getOsArch(){
    // Get CPU architecture for which Node.js binary has compiled
    
        const arch = os.arch();
        return arch;
}


export default executeOs;
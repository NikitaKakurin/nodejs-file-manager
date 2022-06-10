import os from 'os';

async function executeOs(arg){
    if(arg==="cpus"){
        await osCpus();
        return;
    }
    if(arg==="EOL"){
        await osEOL();
        return;
    }
    if(arg==="homedir"){
        await osHomedir();
        return;
    }
    
}

async function osCpus(){
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
    console.log(`Total cpus: ${cpus.length}`);
    console.log(result);
    return;
}

async function osEOL(){
    // Get EOL (default system End-Of-Line)

    const eol = os.EOL==='\n'?'\\n': '\\r\\n';
    console.log(`default system End-Of-Line is ${eol}`)
    return;
}

async function osHomedir(){
    // Get home directory:

    const homedir = os.homedir;
    console.log(`home directory is ${homedir}`)
    return;
}


export default executeOs;
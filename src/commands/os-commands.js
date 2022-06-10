import os from 'os';

async function executeOs(arg){
    if(arg==="cpus"){
        await oScpus();
        return;
    }
}

async function oScpus(){
    const cpus = os.cpus();
    const result = cpus.map(cpu => {
        return{
            model: cpu.model,
            speed: cpu.speed
        };
    })
    console.log(result)
}


export default executeOs;
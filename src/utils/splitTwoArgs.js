function splitTwoArgs(arg){
    const arrFromArg = arg.split(/\s+/);
    if(arrFromArg.length>2){
        console.log("there are gaps in the path or in filename")
        throw new Error();
    }
    if(arrFromArg.length<2){
        throw new Error();
    }
    const fistArg = arrFromArg[0].trim();
    const secondArg = arrFromArg[1].trim();
    return [fistArg, secondArg]
}

export default splitTwoArgs;
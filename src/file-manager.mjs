import * as readline from 'readline';
import { stdin, stdout, argv } from 'process';

import {executeLs, executeUp, executeOs, executeCd, 
        executeCat, executeAdd, executeRn, executeCp,
        executeRm, executeMv, calcHash} from './commands/index.js';

const args = argv.slice(2);
const currentDirectory = {};
const commandsFull = [ 'os --EOL', 'os --cpus',
                        'os --homedir', 'os --username',
                        'os --architecture', 'up', 'ls', 'cd..' ];  
const commandsWithArgs = {
                  cd: executeCd, 
                  cat: executeCat,
                  add: executeAdd,
                  rn: executeRn,
                  cp: executeCp,
                  mv: executeMv,
                  rm: executeRm,
                  hash: calcHash,
                  // compress: compress,
                  // decompress: decompress,
                };
const commandsWithArgsKeys = Object.keys(commandsWithArgs);
const username = args.filter(arg => arg.startsWith('--username='))[0].slice(11);
const greeting = `Welcome to the File Manager, ${username}!`

console.log(greeting);
currentDirectory.path = process.env.HOME || process.env.USERPROFILE;
let directoryMessage = `You are currently in ${currentDirectory.path}`
console.log(directoryMessage);

const rl = readline.createInterface({
    input: stdin,
    output: stdout
  });

rl.on('line', async(command)=>{
  const cmd = command.toString().trim();
  // try{
    await processCommand(cmd);
  // }catch(err){
  //   console.log('Operation failed')
  // }
})
    
async function  processCommand(command){

  if(commandsFull.includes(command)){
    switch (command) {
      case 'ls':
        await executeLs('ls');
        return;
      case 'up':
        await executeUp('up');
        return;
      case 'cd..':
        await executeUp('up');
        return;
    }

    if(command.startsWith('os --')){
      const arg = command.slice(5);
      await executeOs(arg);
      return;
    }
  }

  if(commandsWithArgsKeys.some((cmd)=>command.startsWith(`${cmd} `))){
    const firstSpaceIndex = command.indexOf(' ');
    const cmd = command.slice(0, firstSpaceIndex);
    const args = command.slice(firstSpaceIndex).trim();
    await commandsWithArgs[cmd](args);
    return;    
  }

  console.log('Invalid input');
  return;
}


export {
  currentDirectory
}
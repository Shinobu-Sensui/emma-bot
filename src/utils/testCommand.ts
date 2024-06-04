export default (cmdTarget:string, ...cmds:string[]) : boolean => { 
    return [...cmds].some(cmd => cmd === cmdTarget)
}
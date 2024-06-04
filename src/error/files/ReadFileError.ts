export default class extends Error {
    constructor(message:string) {
        super(); 
        this.name = 'ReadFileError'; 
    }
}
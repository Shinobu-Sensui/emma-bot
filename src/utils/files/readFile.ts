import { readFile } from 'node:fs/promises'
import ReadFileError from '../../error/files/ReadFileError.js';

let cache: string[] | null = null;

export const readfile = async (url: string): Promise<any> => {

    if (cache) return cache

    try {
        const data = await readFile(url, 'utf8');
        if (data) {
            try {
                cache = JSON.parse(data)
                return cache 
            } catch (jsonerror) {
                throw new ReadFileError('Error parsing JSON data.')
            }
        } else {
            throw new ReadFileError('file is empty')
        }

    } catch (error) {
        if (error instanceof ReadFileError) {
            console.error(`Customerror : ${error.message}`)
        } else {
            console.error(`An error occurred while reading the file: ${(error as Error).message}`);
        }
        throw error;  
    }
}

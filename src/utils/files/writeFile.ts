import { createWriteStream, promises as fsPromises } from 'fs';
import { Readable, pipeline as pipelineCallback } from 'stream';
import { promisify } from 'util';
import { resolve, dirname } from 'path';


const pipelineAsync = promisify(pipelineCallback);

/**
 * writes data to the file target
 * @param {string} filePath 
 * @param {string | Readable} data 
 */
export async function writeToFile(filePath: string, data: string | Readable): Promise<void> {
    const absolutePath = resolve(filePath);

    await fsPromises.mkdir(dirname(absolutePath), { recursive: true });

    const writableStream = createWriteStream(absolutePath);

    try {
        if (data instanceof Readable) {

            await pipelineAsync(data, writableStream);
        } else {

            const readableStream = new Readable({
                read() { }
            });
            readableStream.push(data);
            readableStream.push(null);

            await pipelineAsync(readableStream, writableStream);
        }
        console.log(`Data successfully written to ${absolutePath}`);
    } catch (error) {
        console.error(`Error writing to file ${filePath}:`, error);
        throw error;
    }
}
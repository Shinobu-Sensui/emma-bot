import { readFile } from 'fs/promises';
import safeRegex from 'safe-regex';
import shuffle from './array/shuffle.js';


export const readArray = async (url: string): Promise<string[]> => {
    let words = await readFile(url, 'utf-8');
    return JSON.parse(words);
}

export const search = (searchValue: string, array: string[], limit: number): string[] => {
    if (!safeRegex(searchValue)) {
        throw new Error('Unsafe regular expression');
    }

    const result: string[] = [];
    const regex = new RegExp(searchValue, 'i');
    shuffle(array);


    for (let i = 0; i < array.length; i++) {
        if (regex.test(array[i])) {
            result.push(array[i].toUpperCase());
            if (result.length === limit) break;
        }
    }

    return result;
};




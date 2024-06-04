import shuffle from "./array/shuffle.js";
import { readfile } from "./files/readFile.js";

/**
 * Returns every possible syllable consisting of two and three letters in the given word
 * @param {str} str 
 * @returns {Set<string>}
 */

const cutt = (str: string): Set<string> => {
    let a: Set<string> = new Set();
    if (str.includes("'") || str.includes("-") ) return a;
    for (let i = 0; i < str.length; i++) {
        if (i + 1 < str.length) a.add(str.slice(i, i + 2));
        if (i + 2 < str.length) a.add(str.slice(i, i + 3));
    }
    return a;
}

type occ = {
    [key: string]: number;
}

/**
 * Creating an object of syllables with their occurences
 * @param {string[]} array 
 * @returns {CreateOcc}
 */
export const createOcc = (array: string[]): occ => {
    type O = { [key: string]: number }
    let o: O = {}

    for (let i = 0; i < array.length; i++) {
        const result: Set<string> = cutt(array[i])
        for (let j of result) o[j] ? o[j]++ : o[j] = 1;
    }
    return o
}

type Occurrences = {
    [key: string]: number;
}

interface GetSolucesReturn {
    status: string,
    message: string
}

export const getSoluces = async (occurrenceCount: string): Promise<GetSolucesReturn> => {
    const occurrences: Occurrences = await readfile('./src/data/occ.json');
    const parsedOccurrenceCount = parseInt(occurrenceCount);

    if (isNaN(parsedOccurrenceCount)) {
        return { status: 'failed', message: 'Le paramètre que vous avez choisi n\'est pas un nombre.' }
    }
    const syllables: string[] = [];

    for (const syllable in occurrences) {
        if (occurrences[syllable] == parsedOccurrenceCount) {
            syllables.push(syllable.toUpperCase());
        }
    }

    console.log(syllables.length, syllables)
    shuffle(syllables)

    console.log(Object.keys(syllables).map(element => occurrences[element] == parsedOccurrenceCount).length)

    const message = syllables.length > 0 ? `(${syllables.length})\n${syllables.slice(0, 200).join(' ')}.` : `Aucune syllabe n'a été trouvée.`

    return { status: "success", message }
}
const stringToBinary = (str: string): string => {
    let binaryStrings = "";
    for (let i = 0; i < str.length; i++) {
        binaryStrings += str.charCodeAt(i).toString(2).padStart(8, "0");
    }
    return binaryStrings;
};

const binaryToString = (binary: string): string => {
    let text = "";
    for (let i = 0; i < binary.length; i += 8) {
        text += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
    }
    return text;
};

const searchStringInBinaryBitwise = (searchValue: string, array: string[], limit:number): { time: number, results: string[] } => {

    const startTime = performance.now();
    let result = []
    for(let i = 0; i < array.length; i++) {
        if (array[i].includes(searchValue)) {
            result.push(array[i])
            if(result.length == limit) break;
        }
    }

    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    return { time: timeTaken, results: result };
};

export { searchStringInBinaryBitwise, binaryToString, stringToBinary };

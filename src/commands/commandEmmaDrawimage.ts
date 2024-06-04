import ColorMessage from "../utils/message/ColorMessage.js";
import SendMessage from "../utils/message/SendMessage.js";
import 'dotenv/config';
import { Hercai, QuestionData, DrawImageData } from "hercai";


const colorMessage = new ColorMessage();
const sendMessage = new SendMessage();

const ansiColors = {
    reset: "\u001b[0m",
    blue: "\u001b[34m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    gray: "\u001b[90m",
};


type ColorizeFunction = (text: string) => string;


const colorizeCode: ColorizeFunction = (code: string): string => {

    code = code.replace(/(\/\/.*?$)/gm, `${ansiColors.gray}$1${ansiColors.reset}`);


    code = code.replace(/(".*?")/g, `${ansiColors.yellow}$1${ansiColors.reset}`);


    code = code.replace(/\b(function|if|else|return|console\.log)\b/g, `${ansiColors.blue}$1${ansiColors.reset}`);


    code = code.replace(/\b(\d+)\b/g, `${ansiColors.red}$1${ansiColors.reset}`);


    code = code.replace(/\b(verifierNombrePairOuImpair)\b/g, `${ansiColors.green}$1${ansiColors.reset}`);

    return code;
};



export const commandEmmaDrawImage = async (channelId: string, commands: string[]): Promise<void> => {
    try {
        const second = commands.join(' ');
        const herc = new Hercai(process.env.HERCAI_API);
        const responseRequest: DrawImageData = await herc.drawImage({ model: 'v3', prompt: second })

        await sendMessage.send(channelId, responseRequest.url);
    } catch (error) {
        throw new Error("Une erreur est survenue");
    }
};

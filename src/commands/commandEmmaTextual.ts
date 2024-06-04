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

// Type pour la fonction de colorisation
type ColorizeFunction = (text: string) => string;

// Fonction de colorisation
const colorizeCode: ColorizeFunction = (code: string): string => {
    // Coloriser les commentaires
    code = code.replace(/(\/\/.*?$)/gm, `${ansiColors.gray}$1${ansiColors.reset}`);

    // Coloriser les chaînes de caractères
    code = code.replace(/(".*?")/g, `${ansiColors.yellow}$1${ansiColors.reset}`);

    // Coloriser les mots-clés
    code = code.replace(/\b(function|if|else|return|console\.log)\b/g, `${ansiColors.blue}$1${ansiColors.reset}`);

    // Coloriser les nombres
    code = code.replace(/\b(\d+)\b/g, `${ansiColors.red}$1${ansiColors.reset}`);

    // Coloriser les noms de fonctions
    code = code.replace(/\b(verifierNombrePairOuImpair)\b/g, `${ansiColors.green}$1${ansiColors.reset}`);

    return code;
};

export const commandEmmaTextual = async (channelId: string, commands: string[]): Promise<void> => {
    try {
        const second = commands.join(' ');
        const herc = new Hercai(process.env.HERCAI_API); 

        console.log(process.env.HERCAI_API)
        const responseRequest:QuestionData = await herc.question({model:"gemini",content:second})
        
        const splitMessage = (msg: string, size: number) => {
            const parts = [];
            for (let i = 0; i < msg.length; i += size) parts.push(msg.slice(i, i + size));
            return parts;
        };

        const messageParts = splitMessage(responseRequest.reply.replace(/```/gi, ''), 1500);
        for (const part of messageParts) {
            const coloredPart = colorizeCode(part);
            const messageColor = `${colorMessage.msg_yellow(coloredPart)}`;
            await sendMessage.sendColoredMessage(channelId, messageColor);
        }

    } catch (error) {
        throw new Error("Une erreur est survenue");
    }
};


import ColorMessage from "../utils/message/ColorMessage.js";
import SendMessage from "../utils/message/SendMessage.js";
import { perf } from "../utils/perf.js";
import { readArray, search } from "../utils/search.js";

const colorMessage = new ColorMessage();
const sendMessage = new SendMessage();
let words: string[] | null = null;


export const preloadWords = async (): Promise<void> => {
    if (!words) {
        try {
            words = await readArray('./src/data/dico.json');
        } catch (error) {
            words = null;
            console.error("Error reading words:", error);
        }
    }
};

export const commandSearch = async (channelId: string, commands: string[]): Promise<void> => {
    const req = commands.join(' ');

    if (!words) {
        console.error("Words not loaded.");
        return;
    }

    const response = await perf<string[]>(async () => search(req.toUpperCase(), words!, 20));
    const resultMessage = response.response.length
        ? `${response.time}: ${response.response.join(' ')}.`
        : `Aucune réponse n'a été trouvée.`;

    const messageColor = response.response.length ? colorMessage.msg_green(resultMessage) : colorMessage.msg_red(resultMessage);
    await sendMessage.sendColoredMessage(channelId, messageColor);
};

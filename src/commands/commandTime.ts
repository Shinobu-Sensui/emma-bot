import { env } from "process";
import ColorMessage from "../utils/message/ColorMessage.js";
import SendMessage from "../utils/message/SendMessage.js";
import { time } from "../utils/time.js";


const colorMessage = new ColorMessage();
const sendMessage = new SendMessage();
const start = Date.now(); 

export const commandTime = async (channelId: string, commands: string[]): Promise<void> => {
    const response = time(start)
    const messageColor = colorMessage.msg_pink(response);
    console.log(response, "yo")
    await sendMessage.sendColoredMessage(channelId, messageColor)
};

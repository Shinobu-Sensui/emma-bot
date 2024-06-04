import { getSoluces } from "../utils/sn.js";
import ColorMessage from "../utils/message/ColorMessage.js";
import SendMessage from "../utils/message/SendMessage.js";


const colorMessage = new ColorMessage();
const sendMessage = new SendMessage();

export const commandSy = async (channelId: string, commands: string[]): Promise<void> => {
    const response = await getSoluces(commands[0])
    const messageColor = response.status == "success" ? colorMessage.msg_yellow(response.message) : colorMessage.msg_red(response.message);
    await sendMessage.sendColoredMessage(channelId, messageColor)
};

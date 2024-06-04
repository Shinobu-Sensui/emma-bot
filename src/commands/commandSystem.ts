import ColorMessage from "../utils/message/ColorMessage.js";
import SendMessage from "../utils/message/SendMessage.js";
import systemInfo from '../utils/computerInfo.js';

const colorMessage = new ColorMessage();
const sendMessage = new SendMessage();

export const commandSystem = async (channelId: string): Promise<void> => {
    const resultMessage = systemInfo;
    const messageColor = colorMessage.msg_red(resultMessage);
    await sendMessage.sendColoredMessage(channelId, messageColor);
};

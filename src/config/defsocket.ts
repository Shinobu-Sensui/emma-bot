
import io from "socket.io-client";
import SendMessage from "../utils/message/SendMessage.js";
import ColorMessage from "../utils/message/ColorMessage.js";
import { guildData } from "../model/Cmd.js";
import 'dotenv/config';


const defSocket = io("https://defs.opnm.net:443", {
    reconnection: true,
    auth: { token: process.env.DEF_TOKEN }
});

const sendMessage = new SendMessage();
const colorMessage = new ColorMessage();


defSocket.on("def", async (w, t, d) => {
    let message;
    let messageColor;
    if (t === "Error 404") {
        message = `Définition introuvable pour ${w}${d ? `, vouliez-vous dire "${d}" ?` : ""}`;
        messageColor = colorMessage.msg_red(message);
        await sendMessage.sendColoredMessage(guildData.channelId, messageColor);
    } else if (t === "Error 401") {
        message = "Mauvaise requête";
        messageColor = colorMessage.msg_red(message);
        await sendMessage.sendColoredMessage(guildData.channelId, messageColor);
    } else {
        message = `Les définitions ${t} pour le mot ${w} sont: ${d.slice(0, 30).join("\n\n")}`;
        messageColor = colorMessage.msg_orange(message)
        await sendMessage.sendColoredMessage(guildData.channelId, messageColor);
    }
});

export const sendDefRequest = (word: string, dico = "", lang = "fr", reduce = true) => {
    defSocket.emit("def", { word, dico, lang, reduce });
};
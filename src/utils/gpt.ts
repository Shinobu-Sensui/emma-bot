import fetch from 'node-fetch';
import testCommand from "./testCommand.js";

interface Result {
    content: string;
    reply: string;
}

export default async (cmd: string, message: string, sendMessage: any) => {
    if (testCommand(cmd, "emma", "em", "ema")) {
        try {
            const response = await fetch(`https://hercai.onrender.com/v3/hercai?question=${message}`);
            const result: Result | any = await response.json();


            const splitMessage = (msg: string, size: number) => {
                const parts = [];
                for (let i = 0; i < msg.length; i += size) {
                    parts.push(msg.slice(i, i + size));
                }
                return parts;
            };


            const messageParts = splitMessage(result.reply, 1500);


            for (const part of messageParts) {
                await sendMessage(part);
            }

        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}





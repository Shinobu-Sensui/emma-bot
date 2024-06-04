import Guild from "./Guild.js";
import { Message } from 'discord.js';
import management from "../management/guild.js";
import { PartialGuildData } from "../types/partialGuildData.js";

let guildData:any; 

export class Cmd {
    guild: Guild;
    message: string;
    symbols: string[];
    client: Message;
    cmd: string[];

    constructor(message: Message) {
        this.cmd = [];
        const authorData = { author: message.author };
        const partialGuildData: PartialGuildData = {
            guild: message.guild ?? undefined,
            channelId: message.channel.id,
            id: message.id, 
            management,
            cmd:[]
        };

        guildData = partialGuildData;

        this.guild = new Guild(authorData, partialGuildData, management, this.cmd);
        this.client = message;
        this.message = message.content;
        this.symbols = [".", "/"];
    }

    detectCmd(): [boolean, string[], boolean] {
        const exceptions = ["emma", "ema", "em"]
        let except = false;
        const messages: string[] = this.message.split(' ');
        const firstMsg: string = messages[0].toLowerCase();
        let isCommandSymbolMatched: boolean = this.symbols.some(symbol => symbol === firstMsg[0]);
        if (exceptions.includes(firstMsg)) {
            except = true
            isCommandSymbolMatched = true
        }
        return [isCommandSymbolMatched, messages, except];
    }

    async commands() {
        const detectCmdResult = this.detectCmd();
        const isCommandMatched = detectCmdResult[0];
        if (isCommandMatched) {
   
            this.guild.cmd = detectCmdResult[1];
            this.guild.cmd[0] = detectCmdResult[2] ? this.guild.cmd[0] : this.guild.cmd[0].slice(1);
            if (this.cmd) {
                if (this.client.channelId) {
                    this.guild.serverSpecificCommands();
                }
            }
        }
    }
}

export { guildData }; 
import specificCommandsFactory from "../commands/factory.js";
import { PartialGuildData } from "../types/partialGuildData.js";
import { PartialManagement } from "../types/partialManagement.js";
import { PartialAuthorData } from "../types/partialAuthorData.js";
import Author from "./Author.js";


export default class Guild extends Author {
    id: string;
    channelId: string;
    messageId: string;
    cmd: string[];
    guildInfos:PartialGuildData
    management:PartialManagement;
   

    constructor(authorData: PartialAuthorData, data: PartialGuildData, management: PartialManagement, cmd: string[]) {
        super(authorData); 
        this.id = data.guild?.id || '';
        this.channelId = data.channelId;
        this.messageId = data.id;
        this.management = management;
        this.cmd = cmd;
        
        this.guildInfos = {
            management: this.management,
            channelId: this.channelId,
            id: this.id,
            cmd: this.cmd
        };
    }

    serverSpecificCommands() {
        this.guildInfos.cmd = this.cmd; 
        specificCommandsFactory(this.guildInfos);
    }
}

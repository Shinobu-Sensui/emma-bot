import loadCommands from "./commandCentral.js";
import { PartialGuildData } from "../types/partialGuildData.js";

const executeCommand = async (guildsinfos: PartialGuildData): Promise<void> => {
    const info = guildsinfos.management[guildsinfos.id];
    if (!info) return;
    const channelId = guildsinfos.channelId;
    if (info.authorization && info.channelsAuthorization.includes(channelId)) {
        await loadCommands(guildsinfos);
    }
};

export default executeCommand;

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { PartialGuildData } from '../types/partialGuildData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadCommands = async (guildInfos: PartialGuildData): Promise<Record<string, any>> => {
    const commands: Record<string, any> = {};
    const commandMapping = guildInfos.management[guildInfos.id]?.commandsMapping.find(command => command.commandNames.includes(guildInfos.cmd[0]));

    if (commandMapping) {
        const currentCommand = commandMapping.fileName;
        try {
            const modulePath = pathToFileURL(path.resolve(__dirname, `../commands/${commandMapping.fileName}.js`)).href;
            console.log(`Module path: ${modulePath}`);
            const commandModule = await import(modulePath);
            console.log('Module imported:', commandModule);
            commands[commandMapping.fileName] = commandModule;

            if (commandModule[currentCommand] && typeof commandModule[currentCommand] === 'function') {
                await commandModule[commandMapping.fileName](guildInfos.channelId, guildInfos.cmd.slice(1));
            } else {
                console.error(`error: ${commandMapping.fileName}`);
            }
        } catch (error) {
            console.error(`Error importing module ${commandMapping.fileName}:`, error);
        }
    } else {
        console.error(`No mapping found for command: ${guildInfos.cmd[0]}`);
    }

    return commands;
};

export default loadCommands;

import { Client } from 'discord.js';
import { intents } from './intents.js';

let clientInstance: Client | null = null;

const getClient = (): Client => {
    if (!clientInstance) {
        clientInstance = new Client({ intents })
    }
    return clientInstance
}


export default getClient;
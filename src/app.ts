import 'dotenv/config';
import getClient from './config/client.js'
import readyEvent from './event/ready.js';
import userMessage from './handler/userMessage.js';
import './commands/commandCentral.js'
import { preloadWords } from './commands/commandSearch.js';

const client = getClient();
await preloadWords();

client.once('ready', () => readyEvent(client));
client.on('messageCreate', message => userMessage(message))
client.login(process.env.DISCORD_TOKEN);

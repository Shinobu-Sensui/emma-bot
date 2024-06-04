import { Guild } from 'discord.js';
import { PartialManagement } from './partialManagement';

export interface PartialGuildData {
    guild?: Guild; 
    channelId: string;
    id: string;
    management:PartialManagement,
    cmd:string[]
}
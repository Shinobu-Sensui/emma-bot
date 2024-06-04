import { Client, TextChannel } from 'discord.js';
import getClient from "../../config/client.js";
import ColorMessage from './ColorMessage.js';

class SendMessage {
    client: Client;
    colorMessage: ColorMessage;

    constructor() {
        this.client = getClient();
        this.colorMessage = new ColorMessage();
    }

    private async getTextChannel(channelId: string): Promise<TextChannel> {
        const channel = await this.client.channels.fetch(channelId);
        if (!channel || !(channel instanceof TextChannel)) {
            throw new Error("Channel not found or not a text channel");
        }
        return channel;
    }

    async send(channelId: string, message: string) {
        const channel = await this.getTextChannel(channelId);
        await channel.send(message);
    }

    async sendColoredMessage(channelId: string, text: string, choose?: string) {
        const channel = await this.getTextChannel(channelId);
        await channel.send(text);
    }
}

export default SendMessage;

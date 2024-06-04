import { Message } from "discord.js";
import { Cmd } from "../model/Cmd.js";

export default (message: Message) => {
  if (message.author.bot) return;
  new Cmd(message).commands();
};
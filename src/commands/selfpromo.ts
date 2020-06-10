import NodeCache from "node-cache";
import { Message, TextChannel } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const CHANNEL_ID = process.env.CHANNEL_ID;

export const selfpromo = (
  message: Message,
  args: string[],
  userCache: NodeCache
): void => {
  if (userCache.has(message.author.id)) {
    message.reply("You're still on cooldown.");
    message.delete();
    return;
  }
  if (
    /https:\/\/(www\.)?((twitch\.tv\/[a-zA-Z0-9_]+)|(youtube\.com\/watch\?v=[a-zA-Z\-\_0-9]{11})|(youtu\.be\/[a-zA-Z\-\_0-9]{11})|(mixer\.com\/[a-zA-Z0-9]+)|(behance\.net\/gallery\/\d*?\/[0-9a-zA-Z\-]+?))/.test(
      args[0]
    ) &&
    args[0].indexOf("@everyone")
  ) {
    const channel = <TextChannel>message.guild.channels.cache.get(CHANNEL_ID);
    channel.send(`${message.author.tag}: ${args[0]}`);
    userCache.set(message.author.id, true);
    message.delete();
  } else {
    console.log(args[0]);
    message.reply("You are not allowed to send that");
    message.delete();
  }
};

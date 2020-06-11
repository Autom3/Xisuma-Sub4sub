import NodeCache from "node-cache";
import { Message, TextChannel } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const CHANNEL_ID = process.env.CHANNEL_ID;

/**
 * @description Function to be run when the user performs the selfpromo command
 * @param {Message} message - Discord message sent by user
 * @param args - Arguments for the command
 * @param userCache - Cache of users who've used the commands in the past. User's entry expires after certain amount of time
 */
export const selfpromo = (
  message: Message,
  args: string[],
  userCache: NodeCache
): void => {
  //Checks to see if the user is still on cooldown
  if (userCache.has(message.author.id)) {
    message.reply("You're still on cooldown.");
    message.delete();
    return;
  }
  //Checks to see if the link is valid and sends message.
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
  } //If link is not valid, tell user that link is not valid
  else {
    console.log("Failed with arguments of:" + args[0]);
    message.reply("You are not allowed to send that");
    message.delete();
  }
};

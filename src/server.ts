import { Client, DMChannel } from "discord.js";
import NodeCache from "node-cache";
import * as dotenv from "dotenv";
import { selfpromo } from "./commands/selfpromo";

dotenv.config();

const ACCESS_TOKEN = process.env.DISCORD_BOT_ACCESS_TOKEN;
const PREFIX = process.env.PREFIX || ":";
const USER_COOLDOWN = parseInt(process.env.USER_COOLDOWN || "1440");

const bot = new Client();
const userCache = new NodeCache({ stdTTL: USER_COOLDOWN * 60 });

if (ACCESS_TOKEN == null) {
  console.log("No Access Token Supplied");
} else {
  bot.login(ACCESS_TOKEN);
}

bot.on("ready", () => {
  console.log("Logged on as " + bot.user.tag);
  bot.user.setPresence({
    status: "online",
    activity: { name: `Use ${PREFIX}selfpromo <link>` },
  });
});

bot.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  if (
    message.channel instanceof DMChannel ||
    typeof message.guild === undefined
  ) {
    message.reply(
      "This bot commands can only be executed from the Discord server channel!"
    );
    return;
  }

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command == "selfpromo") {
    selfpromo(message, args, userCache);
  }
});

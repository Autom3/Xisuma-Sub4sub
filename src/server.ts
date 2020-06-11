import { Client, DMChannel } from "discord.js";
import NodeCache from "node-cache";
import * as dotenv from "dotenv";
import { selfpromo } from "./commands/selfpromo";

dotenv.config();

//Sets up global variables
const ACCESS_TOKEN = process.env.DISCORD_BOT_ACCESS_TOKEN;
const PREFIX = process.env.PREFIX || ":";
const USER_COOLDOWN = parseInt(process.env.USER_COOLDOWN || "1440");

//Sets up Discord bot client
const bot = new Client();

//Sets up cooldown cache
const userCache = new NodeCache({ stdTTL: USER_COOLDOWN * 60 });

//Verifies that there is a valid access token
if (ACCESS_TOKEN == null) {
  console.log("No Access Token Supplied");
} else {
  bot.login(ACCESS_TOKEN);
}

//Initial setup once bot logs in
bot.on("ready", () => {
  console.log("Logged on as " + bot.user.tag);
  bot.user.setPresence({
    status: "online",
    activity: { name: `Use ${PREFIX}selfpromo <link>` },
  });
});

//Checks message to see if there are commands, and responds accordingly
bot.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  if (
    message.channel instanceof DMChannel ||
    typeof message.guild === undefined
  ) {
    message.reply(
      "Bot commands can only be executed from the Discord server channel!"
    );
    return;
  }
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command == "selfpromo") {
    selfpromo(message, args, userCache);
  }
});

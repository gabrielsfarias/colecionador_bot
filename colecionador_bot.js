import { TelegramClient } from "telegramsjs";

const client = new TelegramClient(process.env.TELEGRAM_BOT_TOKEN);

client.on("ready", async({user}) => {
  await user.setCommands([
    {
      command: "/start",
      description: "Starting command",
    },
    {
      command: "/card",
      description: "Card command",
    },
  ]);

  console.log(`Bot @${user.username} está pronto!`);
});

client.on("message", async(message) => {
  if (message.content === "/start" && message.author) {
    await message.reply(
      `Hello ${message.author.username ? `@${message.author.username}` : message.author.firstName}!`,
    );
    return;
  } else {
    await message.reply("Here is the card you requested!");
    return
  }
});

client.login();

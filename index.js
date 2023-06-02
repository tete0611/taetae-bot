const { Client, Collection, REST, Routes, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { env } = process;

const client = (module.exports = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
}));

/** 이벤트 파일 등록 */
const fs = require('fs');
const eventFolders = fs.readdirSync('./events');
/** 폴더 loop */
for (const folder of eventFolders) {
  const eventsPath = `./events/${folder}`;
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
  /** 파일 loop */
  for (const file of eventFiles) {
    const event = require(`./events/${folder}/${file}`);
    if (event.once == true) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

/** 커맨드 파일 등록 */
client.commands = new Collection();
const commands_json = [];
const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
/** 파일 loop */
for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands_json.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(env.TOKEN);

rest
  .put(Routes.applicationCommands(env.ID), { body: commands_json })
  .then(command => console.log(`${command.length}개의 커맨드를 푸쉬했습니다.`))
  .catch(console.error);

try {
  client.login(env.TOKEN);
} catch (TOKEN_INVALID) {
  console.log('An invalid token was provided');
}

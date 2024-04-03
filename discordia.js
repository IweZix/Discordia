const { Client, IntentsBitField, Collection } = require("discord.js");

const loadCommands = require("./loaders/loadCommands");
const loadEvents = require("./loaders/loadEvents");
const loadInteractions = require("./loaders/loadInteractions");

const client = new Client({ intents: new IntentsBitField(3276799) });
require("dotenv").config();

client.commands = new Collection();
client.interactions = new Collection();

(async () => {
  loadCommands(client);
  loadEvents(client);
  loadInteractions(client);

  await client.login(process.env.TOKEN);
})();

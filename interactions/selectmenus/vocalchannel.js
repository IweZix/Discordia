const Discord = require("discord.js");
const fs = require("fs");
const { parse, serialize } = require("../../utils/json");

/**
 * Select menu options
 */
const selectMenuOptions = [
    {
        label: "{pseudo}'s channel",
        value: "1",
    },
    {
        label: "🎮 | {pseudo}",
        value: "2",
    },
    {
        label: "🎧 | {pseudo}",
        value: "3",
    },
    {
      label: "🔉 {depseudo}",
      value: "4",
    },
];

/**
 * Path to the database
 */
let jsonDbPath = __dirname + '/../../data/vocalchannel/';

/**
 * 
 * @param {Interaction} interaction 
 */
async function vocalchannel(interaction) {
  const value = interaction.values[0];
  let model = selectMenuOptions.find(option => option.value === value);
  model = model.label;
  
  const guild = interaction.guild;
  
  // create vocal channel
  let channel;
  try {
    channel = await guild.channels.create({
      name : "↪ | Create your channel",
      descritption : "Create your own vocal channel",
      type: Discord.ChannelType.GuildVoice,
    });
  } catch (error) {
    await interaction.reply({ content: "An error occurred while creating the vocal channel.", ephemeral: true });
    return;
  }

  // save vocal channel in database
  const path = getPath(interaction.guildId);
  const data = parse(path, []);
  data.push({
    guildId: interaction.guildId,
    channelId: channel.id,
    model: model
  });

  serialize(path, data);
  await interaction.reply({ content: "The vocal channel has been created.", ephemeral: true });
}

/**
 * Get the path to the database
 * @param {String} guildId 
 * @returns {String} path
 */
function getPath(guildId) {
  const path = jsonDbPath + guildId + '.json';
  if (!fs.existsSync(jsonDbPath)) {
    fs.mkdirSync(jsonDbPath);
  }
  return path
}

module.exports = {
    vocalchannel
}
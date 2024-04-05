const { Interaction } = require('discord.js');
const { parse, serialize } = require('./json');
const fs = require('fs');

let jsonDbPath = __dirname + '/../logs/';

/**
 * Write an error to a json file
 * @param {Interaction} interaction 
 * @param {Error} error 
 */
function writeErrorCommande(interaction, error) {
  try {
    const path = getPath(interaction.guildId);
    const data = parse(path, []);
    data.push({
      date: new Date().toISOString(),
      command: interaction.commandName,
      error: error.message
    });
    serialize(path, data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Create the path to the json file
 * @param {String} guildId 
 * @returns the path to the json file
 */
function getPath(guildId) {
  try {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0];
    const path = jsonDbPath + dateString + '/' + guildId +  '.json';
    if (!fs.existsSync(jsonDbPath)) {
      fs.mkdirSync(jsonDbPath + dateString);
    }
    return path;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  writeErrorCommande
};
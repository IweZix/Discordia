const { parse, serialize } = require('./json');
const fs = require('fs');

let jsonDbPath1 = __dirname + '/../data/';
let jsonDbPath = __dirname + '/../data/onoff/';

/**
 * Enable a command
 * @param {Interaction} interaction
 * @param {String} command to enable
 * @returns {Boolean} true if the command was enabled, false otherwise
 */
function on (interaction, command) {
  const path = getPath(interaction.guildId);
  const data = parse(path, []);
  let dataCommand = data.find(d => d.command === command);

  if (dataCommand) {
    dataCommand.status = true;
    serialize(path, data);
    return true;
  }

  data.push({
    command: command,
    status: true
  });

  serialize(path, data);
  return true;
}

/**
 * Disable a command
 * @param {Interaction} interaction 
 * @param {String} command to disable
 * @returns {Boolean} true if the command was disabled, false otherwise
 */
function off (interaction, command) {
  const path = getPath(interaction.guildId);
  const data = parse(path, []);
  let dataCommand = data.find(d => d.command === command);

  if (dataCommand) {
    dataCommand.status = false;
    serialize(path, data);
    return true;
  }

  data.push({
    command: command,
    status: false
  });

  serialize(path, data);
  return true;
}

/**
 * Create the path to the json file
 * @param {String} guildId to create the path
 * @returns the path to the json file
 */
function getPath(guildId) {
  const path = jsonDbPath + guildId + '.json';
  if (!fs.existsSync(jsonDbPath)) {
    fs.mkdirSync(jsonDbPath1);
    fs.mkdirSync(jsonDbPath);
  }
  return path;
}

/**
 * Check if a command is activated
 * @param {Interaction} interaction 
 * @param {String} command to check
 * @returns {Boolean} true if the command is activated, false otherwise
 */
function isActivated(interaction, command) {
  const path = getPath(interaction.guildId);
  const data = parse(path, []);
  let dataCommand = data.find(d => d.command === command);
  if (!dataCommand) {
    data.push({
      command: command,
      status: true
    });
    serialize(path, data);
    return true;
  }
  return dataCommand.status;
}

module.exports = {
  on, off, isActivated
};
const Discord = require("discord.js");
const { Events } = require("discord.js");
const { parse, serialize } = require("../../utils/json");

let jsonDbPath = __dirname + '/../../data/vocalchannel/';

/**
 * Event to manage the creation of vocal channels
 */
module.exports = {
  name: Events.VoiceStateUpdate,

  async run(client, oldState, newState) {

    try {
      const guild = newState.guild || oldState.guild;
    
      const guildId = newState.guild.id || oldState.guild.id;
      jsonDbPath = __dirname + '/../../data/vocalchannel/' + guildId + '.json';
      const channels = parse(jsonDbPath);
      
      let oldChannel = oldState.channel;
      let newChannel = newState.channel;
      let user = newState.member.user;

      // if the user joins a channel
      if (!oldChannel && newChannel) {
        const channelId = newChannel.id;
        const c = channels.find(c => c.channelId === channelId);
        if (!c) return;
        
        const parentChannel = newChannel.parentId;

        const channelCreated = await guild.channels.create({
          name: c.model.replace(/{pseudo}/g, user.username).replace(/{depseudo}/g, user.username.split('').join('')),
          type: Discord.ChannelType.GuildVoice,
          parent: parentChannel,
        }); 

        newChannel.guild.members.cache.get(user.id).voice.setChannel(channelCreated);

        channels.push({ 
          guildId: guildId,
          channelId: channelCreated.id,
          model: null
        });

        serialize(jsonDbPath, channels);
      }

      // if the user leaves the channel
      if (oldChannel && !newChannel) {
        const channelId = oldChannel.id;
        const c = channels.find(c => c.channelId === channelId);
        if (!c) return;

        if (c.model) return;

        if (oldChannel.members.size === 0) {
          oldChannel.delete();
          channels.splice(channels.indexOf(c), 1);
          serialize(jsonDbPath, channels);
        }
      }

      // if the user changes channel
      if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {

        let oldChannelData = channels.find(c => c.channelId === oldChannel.id);
        if (oldChannelData && !oldChannelData.model) {
          if (oldChannel.members.size === 0) {
            oldChannel.delete();
            channels.splice(channels.indexOf(oldChannelData), 1);
            serialize(jsonDbPath, channels);
          }
        }

        let newChannelData = channels.find(c => c.channelId === newChannel.id);
        if (newChannelData && newChannelData.model) {
          let channel = await guild.channels.create({
            name: newChannelData.model.replace(/{pseudo}/g, user.username).replace(/{depseudo}/g, user.username.split('').join('')),
            type: Discord.ChannelType.GuildVoice,
            parent: newChannel.parentId,
          });
          channels.push({ 
            guildId: guildId,
            channelId: channel.id,
            model: null
          });
          serialize(jsonDbPath, channels);
          newChannel.guild.members.cache.get(user.id).voice.setChannel(channel);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};

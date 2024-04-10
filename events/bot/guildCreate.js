const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildCreate,

  async run(client, guild) {
    try {
      const channelId = "1227548258445037629";
      const channel = client.channels.cache.get(channelId);

      if (!channel) return;

      channel.send(`\`\`${client.user.username}\`\` has joined \`\`${guild.name}\`\`-\`\`${guild.id}\`\``);

    } catch (error) {
      logger.error(error);
    }
  },
};

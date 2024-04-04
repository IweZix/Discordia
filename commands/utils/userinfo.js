const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { uptime } = require("../../utils/functions");
const { writeErrorCommande } = require("../../utils/logger");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get some info about a user in the server")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get information about")
        .setRequired(false)
    ),

  async run(interaction) {
    try {
      const client = interaction?.client;

      const user = interaction.options.getUser("user") || interaction.user;

      const embed = new EmbedBuilder()
        .setTitle(`Info about ${interaction.user.username}`)
        .setDescription(
          `
                    __** Info about ${user.username} **__
                    > **Name : ** ${user.username}
                    > **ID : ** ${user.id}
                    > **Tag : ** ${user.tag}
                    > **Created at : ** ${user.createdAt}
                    > **Bot : ** ${user.bot ? ":white_check_mark:" : ":x:"}
                    > **System : ** ${user.system ? ":white_check_mark:" : ":x:"}
                    > **Avatar : ** [Click here](${user.displayAvatarURL()})
                `
        )
        .setColor("#AA00FF")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: `© 2024 | ${client?.user?.username}` })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      writeErrorCommande(interaction, error);
      await interaction.reply(
        "There was an error while executing this command!"
      );
    }
  },
};

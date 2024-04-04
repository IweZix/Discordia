const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { uptime } = require("../../utils/functions")
const { writeErrorCommande } = require("../../utils/logger");
require("dotenv").config();

module.exports = {

    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Get some info about the server")
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),

    async run(interaction) {

        try {
            const client = interaction?.client;

            const embed = new EmbedBuilder()
                .setTitle("Info about the server")
                .setDescription(`
                    __**Server Info**__
                    > **Name : ** ${interaction.guild.name}
                    > **Owner : ** <@${interaction.guild.ownerId}>
                    > **Members : ** ${interaction.guild.memberCount}
                    > **Created at : ** ${interaction.guild.createdAt}
                    > **Verification Level : ** ${interaction.guild.verificationLevel}
                    > **Boosts : ** ${interaction.guild.premiumSubscriptionCount}
                    > **Boost Level : ** ${interaction.guild.premiumTier}
                    > **Roles : ** ${interaction.guild.roles.cache.size}
                    > **Channels : ** ${interaction.guild.channels.cache.size}
                `)
                .setColor("#AA00FF")
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({text: `© 2024 | ${client?.user?.username}`})
                .setTimestamp()
            ;

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            writeErrorCommande(interaction, error);
            await interaction.reply("There was an error while executing this command!");
        }
    }

};

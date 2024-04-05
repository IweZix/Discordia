const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { uptime } = require("../../utils/functions")
const { writeErrorCommande } = require("../../utils/logger");
const { isActivated } = require("../../utils/onoff");
require("dotenv").config();

module.exports = {

    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Get some info about the bot")
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),

    async run(interaction) {

        try {
            if (!isActivated(interaction, this.data.name)) {
                await interaction.reply({ content: "The command is disabled!", ephemeral: true });
                return;
            }

            const client = interaction?.client;

            const embed = new EmbedBuilder()
                .setTitle("Info about the bot")
                .setDescription(`
                    __**Bot Info**__
                    > **Developer : ** <@${process.env.DEVELOPER_ID}>
                    > **Name : ** ${client?.user?.username}
                    > **Node.js : ** ${process.version}
                    > **Version : ** v${process.env.VERSION}
                    > **Uptime : ** ${uptime(client?.uptime)}

                    __**Bot Info**__
                    > **Created at : ** ${client?.user?.createdAt}
                `)
                .setColor("#AA00FF")
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({text: `© 2024 | ${client?.user?.username}`})
                .setTimestamp()
            ;

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle("5")
                        .setLabel("Invite me")
                        .setEmoji("➕")
                        .setURL(process.env.INVITE_BOT_URL),
                    new ButtonBuilder()
                        .setStyle("5")
                        .setLabel("Support Server")
                        .setEmoji("🛠")
                        .setURL(process.env.SUPPORT_SERVER_URL),
                    new ButtonBuilder()
                        .setStyle("5")
                        .setLabel("Web Site")
                        .setEmoji("🌐")
                        .setURL(process.env.WEB_SITE_URL)
                );
            ;

            await interaction.reply({ embeds: [embed], components: [buttons]});
        } catch (error) {
            writeErrorCommande(interaction, error);
            await interaction.reply("There was an error while executing this command!");
        }
    }

};

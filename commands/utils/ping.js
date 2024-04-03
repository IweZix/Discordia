const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { writeErrorCommande } = require("../../utils/logger");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get the bot latency")
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),

    async run(interaction) {

        try {
            const embed = new EmbedBuilder()
                .setTitle("Ping")
                .setDescription(`Ping : \`${interaction?.client?.ws?.ping}\`.`)
                .setColor("#AA00FF")
                .setFooter({text: `© 2024 | ${interaction?.client?.user?.username}`})
                .setTimestamp()
            ;

            const rowButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("ping")
                        .setEmoji("🔄")
                        .setLabel("Refresh")
                        .setStyle(ButtonStyle.Secondary)
                        
                )
            ;
            
            await interaction.reply({ embeds: [embed], components: [rowButton] });
        } catch (error) {
            writeErrorCommande(interaction, error);
            await interaction.reply("There was an error while executing this command!");
        }
    }

};

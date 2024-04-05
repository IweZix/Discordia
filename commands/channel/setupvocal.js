const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const { writeErrorCommande } = require("../../utils/logger");
const { isActivated } = require("../../utils/onoff");

/**
 * Setup channel command.
 * Send a message to choose the type of channel to create.
 */
module.exports = {

    data: new SlashCommandBuilder()
        .setName("setupvocal")
        .setDescription("Setup the vocal channel")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async run(interaction) {

        try {
            const client = interaction.client;

            if (!isActivated(interaction, this.data.name)) {
                await interaction.reply({ content: "The command is disabled!", ephemeral: true });
                return;
            }

            const embed = new EmbedBuilder()
                .setTitle("__**Setup vocal channel**__")
                .setDescription(`
                    Choose type of pilote channel

                    **🔊 | Vocal Channel**
                    > To create a vocal channel
                    
                    ** ❌ | Cancel**
                    > To cancel the operation
                `)
                .setColor("#AA00FF")
                .setFooter({text: `© 2024 | ${client?.user?.username}`})
                .setTimestamp();
            ;

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("Vocal Channel")
                        .setEmoji("🔊")
                        .setCustomId("vocalchannel"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Cancel")
                        .setEmoji("✖️")
                        .setCustomId("cancel")
                );
            ;
            
            await interaction.reply({ embeds: [embed], components: [buttons] });
        } catch (error) {
            console.log(error);
            writeErrorCommande(interaction, error);
            await interaction.reply("There was an error while executing this command!");
        }
    }

};

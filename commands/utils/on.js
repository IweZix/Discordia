const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { writeErrorCommande } = require("../../utils/logger");
const { isCommandExists } = require("../../utils/functions");
const { on } = require("../../utils/onoff");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("on")
        .setDescription("Active a command")
        .setDMPermission(true)
        .setDefaultMemberPermissions(null)
        .addStringOption(option => 
            option.setName("command")
                .setDescription("The command to enable")
                .setRequired(true)
        ),

    async run(interaction) {

        try {
            const client = interaction?.client;
            const command = interaction.options.getString("command");

            if (command === "on" || command === "off") {
                await interaction.reply({ content: `The command ${command} cannot be enabled!`, ephemeral: true });
                return;
            }

            if (!isCommandExists(client, command)) {
                await interaction.reply({ content: `The command ${command} does not exist!`, ephemeral: true });
                return;
            }

            on(interaction, command);
            
            
            await interaction.reply({ content: `The command \`\`${command}\`\` has been enabled!`, ephemeral: true });
        } catch (error) {
            writeErrorCommande(interaction, error);
            await interaction.reply({ content: "An error occurred while executing this command!", ephemeral: true });
        }
    }

};

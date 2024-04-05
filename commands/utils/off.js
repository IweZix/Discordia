const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const { writeErrorCommande } = require("../../utils/logger");
const { isCommandExists } = require("../../utils/functions");
const { off } = require("../../utils/onoff");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("off")
        .setDescription("Desactive a command")
        .setDMPermission(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
                await interaction.reply({ content: `The command ${command} cannot be disable!`, ephemeral: true });
                return;
            }

            if (!isCommandExists(client, command)) {
                await interaction.reply({ content: `The command ${command} does not exist!`, ephemeral: true });
                return;
            }
            
            off(interaction, command);
            
            
            await interaction.reply({ content: `The command \`\`${command}\`\` has been disable!`, ephemeral: true });
        } catch (error) {
            writeErrorCommande(interaction, error);
            await interaction.reply({ content: "An error occurred while executing this command!", ephemeral: true });
        }
    }

};

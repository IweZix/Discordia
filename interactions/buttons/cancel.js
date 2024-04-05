const { ComponentType, EmbedBuilder } = require("discord.js");

/**
 * Cancel button event.
 * Event to delete the message when the button is clicked.
 */
module.exports = {

    name: "cancel",
    type: ComponentType.Button,

    async run(interaction) {

        try {
            await interaction.message.delete();
        } catch (error) {
            await interaction.message.channel.send({ embeds: [new EmbedBuilder().setDescription("An error occurred while executing this command!").setColor("#FF0000")] });
        }
    }
};
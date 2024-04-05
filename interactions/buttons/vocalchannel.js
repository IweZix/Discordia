const { ComponentType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * vocalchannel button event.
 * Event to send an embed to choose how to create a vocal channel.
 */
module.exports = {

    name: "vocalchannel",
    type: ComponentType.Button,

    async run(interaction) {

        try {
            interaction.deferUpdate();

            interaction.message.delete();

            const embed = new EmbedBuilder()
                .setTitle("__**Choose pilote channel**__")
                .setDescription(`
                    The pilote channel is a channel that will be used to create the channel.

                    ** 📥 | Create for me**
                    
                    ** ✖️ | Cancel**
                `)
                .setColor("#AA00FF")
                .setFooter({text: `© 2024 | ${interaction.client?.user?.username}`})
                .setTimestamp();
            ;

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("Vocal Channel")
                        .setEmoji("📥")
                        .setCustomId("createvocalchannel"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Cancel")
                        .setEmoji("✖️")
                        .setCustomId("cancel")
                );
            ;

            await interaction.message.channel.send({ embeds: [embed], components: [buttons] });
        } catch (error) {
            await interaction.message.channel.send({ content: "An error occurred while processing the command.", ephemeral: true });
        }
    }
};
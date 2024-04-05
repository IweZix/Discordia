const { ComponentType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");

/**
 * vocalchannel button event.
 * Event to send an embed to choose how to create a vocal channel.
 */
module.exports = {

    name: "createvocalchannel",
    type: ComponentType.Button,

    async run(interaction) {

        try {
            interaction.deferUpdate();

            interaction.message.delete();

            const embed = new EmbedBuilder()
                .setTitle("__**Choose pilote channel**__")
                .setDescription(`
                    Choose the model of the vocal channel :
                `)
                .setColor("#AA00FF")
                .setFooter({text: `© 2024 | ${interaction.client?.user?.username}`})
                .setTimestamp();
            ;

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Cancel")
                        .setEmoji("✖️")
                        .setCustomId("cancel")
                );
            ;

            let selectMenuOptions = [
                {
                    label: "{pseudo}'s channel",
                    value: "1",
                },
                {
                    label: "🎮 | {pseudo}",
                    value: "2",
                },
                {
                    label: "🎧 | {pseudo}",
                    value: "3",
                },
                {
                  label: "🔉 {depseudo}",
                  value: "4",
              },
            ];

            const selectMenu = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("vocalchannel")
                        .setPlaceholder("Select a model")
                        .addOptions(selectMenuOptions)
                );
            ;

            await interaction.message.channel.send({ embeds: [embed], components: [selectMenu, buttons] });
        } catch (error) {
          console.log(error);
            await interaction.message.channel.send({ content: "An error occurred while processing the command.", ephemeral: true });
        }
    }
};
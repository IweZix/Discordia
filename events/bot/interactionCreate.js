const { Events, InteractionType, PermissionsBitField } = require("discord.js");
const { vocalchannel } = require("../../interactions/selectmenus/vocalchannel");

module.exports = {

    name: Events.InteractionCreate,

    async run(client, interaction) {

        switch (interaction.type) {

            /**
             * Case for application command
             */
            case InteractionType.ApplicationCommand:
                const command = client.commands.get(interaction.commandName);
                if (command.data.default_member_permissions && !interaction.member.permissions.has(new PermissionsBitField(command.data.default_member_permissions))) {
                    return await interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true });
                }

                command.run(interaction)
            break;

            /**
             * Case for message component
             * (Button or Select Menu)
             */
            case InteractionType.MessageComponent:
                /**
                 * Get the button name and args
                 * exemple : ban_1234567890_reason
                 * => [ban, 1234567890, reason]
                 */
                if (interaction.componentType == 2) {
                    const name = interaction?.customId?.split("_")[0];
                    const args = interaction?.customId?.split("_").slice(1);
                    const file = client.interactions.find(file => file.name === name && file.type === interaction.componentType);
                    if (!file) return;

                    if (file.permission && !interaction.member.permissions.has(new PermissionsBitField(file.permission))) {
                        return await interaction.reply({ content: "You don't have permission to use this button.", ephemeral: true });
                    }

                    await file.run(interaction, ...args);
                }
                    
                // Select Menu
                if (interaction.componentType == 3) {
                    const customId = interaction.customId;
                    if (!customId) return;

                    if (customId === "vocalchannel") {
                        vocalchannel(interaction);
                    }
                }

            break;
        };
    }
};
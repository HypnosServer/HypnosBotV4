import Discord from "discord.js";
import { client } from "../assets/Types";
module.exports.run = (client: client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!client.config) return;
        if (interaction.isCommand()) {
            const commandName = interaction.commandName;
            // Checks if user can use the command
            if (!interaction.guild) return interaction.reply("why dm...");
            if (!client.commands!.get(commandName)!) {
                interaction.reply("Unable to find the command :sob:");
                return;
            }
            if (
                client.commands!.get(commandName)!.help.adminOnly &&
                !interaction.guild.members.cache
                    .get(interaction.user.id)
                    ?.roles.cache.has(client.config.adminRole)
            ) {
                interaction.reply("You aren't an admin");
                return;
            }
            if (
                client.commands!.get(commandName)!.help.memberOnly &&
                !interaction.guild.members.cache
                    .get(interaction.user.id)
                    ?.roles.cache.has(client.config.memberRole)
            ) {
                interaction.reply("You aren't a member");
                return;
            }
            if (
                client.commands!.get(commandName)!.help.staffOnly &&
                !client.config.staff.includes(interaction.user.id)
            ) {
                interaction.reply("This command is only for bot staff :|");
                return;
            }
            // runs the command
            await client
                .commands!.get(commandName)!
                .run({ interaction: interaction, client: client });
        }
    });
};

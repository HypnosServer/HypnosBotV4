"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.run = (client) => {
    client.on("interactionCreate", (interaction) => {
        var _a, _b;
        if (!client.config)
            return;
        if (interaction.isCommand()) {
            const commandName = interaction.commandName;
            // Checks if user can use the command
            if (!interaction.guild)
                return interaction.reply("why dm...");
            if (!client.commands.get(commandName)) {
                interaction.reply("Unable to find the command :sob:");
                return;
            }
            if (client.commands.get(commandName).help.adminOnly && !((_a = interaction.guild.members.cache.get(interaction.user.id)) === null || _a === void 0 ? void 0 : _a.roles.cache.has(client.config.adminRole))) {
                interaction.reply("You aren't an admin");
                return;
            }
            if (client.commands.get(commandName).help.memberOnly && !((_b = interaction.guild.members.cache.get(interaction.user.id)) === null || _b === void 0 ? void 0 : _b.roles.cache.has(client.config.memberRole))) {
                interaction.reply("You aren't a member");
                return;
            }
            if (client.commands.get(commandName).help.staffOnly && !client.config.staff.includes(interaction.user.id)) {
                interaction.reply("This command is only for bot staff :|");
                return;
            }
            // runs the command
            client.commands.get(commandName).run({ interaction: interaction, client: client });
        }
    });
};

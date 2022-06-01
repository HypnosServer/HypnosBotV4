import Discord from "discord.js";
import { client } from "../assets/Types";
import { websocket } from "../index";
module.exports.run = (client: client) => {
    client.on("messageCreate", (msg) => {
        if (
            msg.channel.id == client.config?.chatbridge.channel &&
            msg.author.id != client.user?.id &&
            websocket.chatbridge
        ) {
            websocket.send(`MSG [§5${msg.author.username}§f] ${msg.content}`);
        }
        if (!client.config) return;
        // Returns if the author is a bot
        if (msg.author.bot) return;
        // Returns if msg doesn't start with prefix
        if (!msg.content.startsWith(client.config.prefix)) return;
        // Declares args and command value
        const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/);
        const command = args.shift()!.toLowerCase();

        // Checks if user can use the command
        if (!client.commands!.get(command)!) {
            msg.channel.send("Unable to find the command :sob:");
            return;
        }
        if (
            client.commands!.get(command)!.help.adminOnly &&
            !msg.member!.roles.cache.has(client.config.adminRole)
        ) {
            msg.channel.send("You aren't an admin");
            return;
        }
        if (
            client.commands!.get(command)!.help.memberOnly &&
            !msg.member!.roles.cache.has(client.config.memberRole)
        ) {
            msg.channel.send("You aren't a member");
            return;
        }
        if (
            client.commands!.get(command)!.help.staffOnly &&
            !client.config.staff.includes(msg.author.id)
        ) {
            msg.channel.send("This command is only for bot staff :|");
            return;
        }
        // runs the command
        client
            .commands!.get(command)!
            .run({ msg: msg, args: args, client: client });
    });
};

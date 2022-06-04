import Discord from "discord.js";
import { client } from "../assets/Types";
//import { websocket } from "../index";
module.exports.run = (client: client) => {
    client.on("messageCreate", async (msg) => {
        if (
            msg.channel.id == client.config?.chatbridge.channel &&
            msg.author.id != client.user!.id &&
            client.config.chatbridge.enabled
        ) {
            let reply = "";
            // show if it's a reply or not
            if (msg.reference) {
                const replymsg = msg.channel.messages.cache.get(msg.reference.messageId!.toString());
                let author = `§d${replymsg?.author.username}§f `;
                if (replymsg?.author.id == client.user!.id) {
                    author = "";
                }
                reply = `reply -> ${author}${replymsg?.content}\n`;
            } 
            console.log(msg.content);
            const attachments = msg.attachments.size > 0;
            // remove ugly emoji identifier
            //let content = msg.content.replace(/^[<]|[0-9]|[0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9][0-9][0-9]|[0-9][0-9][0-9][0-9][0-9]|>$/g, "");
            let content = msg.content;
            if (content.length > 0) {
                client.taurus?.send(`MSG ${reply}[§5${msg.author.username}§f] ${content}`);
            } 
            // if there are attachments then we can indicate that there are and send each link
            if (attachments) {
                client.taurus?.send(`MSG [§5${msg.author.username}§f] ${msg.attachments.size} attachments`);
                for (const [_, value] of msg.attachments) {
                    client.taurus?.send(`URL ${value.url}`);
                }
            }
        }
        if (!client.config) return;
        // Returns if the author is a bot
        if (msg.author.bot) return;
        // Returns if msg doesn't start with prefix
        let cmdPrefix = "";
        for (const prefix of client.config.prefix) {
            if (msg.content.startsWith(prefix)) cmdPrefix = prefix;
        }
        if (cmdPrefix.length == 0) return;
        
        // Declares args and command value
        const args = msg.content
            .slice(cmdPrefix.length)
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
        await client
            .commands!.get(command)!
            .run({ msg: msg, args: args, client: client });
    });
};

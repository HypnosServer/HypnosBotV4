import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../index";

module.exports = {
    run: async (input: input2) => {
        if (
            !input.args ||
            input.args.length < 2 ||
            !input.content ||
            input.content?.length < 10
        ) {
            return { text: "expected arguments" };
        }
        const command = input.content?.slice(9);
        input.client.taurus?.send(`RCON ${command}`);
        const reply = await fetchLatestWithType("RCON");
        if (reply && reply.toString().length > 0) {
            const value = reply.toString();
            const sliced = value.slice(5);
            let embed = new Discord.MessageEmbed()
                .setTitle("execute :dagger:")
                .addField(command, sliced);
            return { embeds: [embed] };
        } else {
            return { text: "error" };
        }
    },
    help: {
        name: "execute",
        usage: "execute <server> <command>",
        example: "execute SMP list",
        desc: "execute command via rcon",
        group: "public",
        staffOnly: false,
        adminOnly: true,
        memberOnly: false,
        slash: "both",
        options: [
            {
                name: "options",
                description: "SERVER command(s) to be executed",
                required: true,
                type: "STRING",
            },
        ],
    },
};

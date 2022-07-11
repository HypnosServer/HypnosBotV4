import Discord from "discord.js";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../assets/Connector";

module.exports = {
    run: async (input: input2) => {
        return new Promise(async(resolve, reject) => { 
            if (
                !input.args ||
                input.args.length < 2 ||
                !input.content ||
                input.content?.length < 10
            ) {
                return reject({ text: "expected arguments" })
            }
            const command = input.content?.slice(9);
            input.client.taurus?.send(`RCON ${command}`);
            const reply = await fetchLatestWithType("RCON");
            if (reply && reply.toString().length > 0) {
                const value = reply.toString();
                const sliced = value.slice(5);
                if (sliced.length > 0) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("execute :dagger:")
                    .addField(command, sliced);
                    return resolve({ embeds: [embed] })
                } else {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("execute :dagger:")
                    .addField(command, "sent command to session");
                    return resolve({ embeds: [embed] })
                }
            } else {
                return reject({ text: "error" })
            }
         })
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

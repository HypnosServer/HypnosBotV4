import Discord from "discord.js";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../assets/Connector";

module.exports = {
    run: async (input: input2) => {
        return new Promise(async (resolve, reject) => {
            input.client.taurus?.send("LIST");
            const reply = await fetchLatestWithType("LIST");
            if (reply && reply.toString().length > 0) {
                const value = reply.toString();
                const sliced = value.slice(5).replace(":", ": ");
                let embed = new Discord.MessageEmbed()
                    .setTitle("online :pencil:")
                    .setDescription(sliced);
                return resolve({ embeds: [embed] });
            } else {
                return reject({ text: "error" });
            }
        });
    },
    help: {
        name: "online",
        usage: "online",
        example: "online",
        desc: "list players online the server",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

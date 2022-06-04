import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../index";

module.exports = {
    run: async (input: input2) => {
        input.client.taurus?.send("LIST")
        const reply = await fetchLatestWithType("LIST");
        if (reply && reply.toString().length > 0) {
            const value = reply.toString();
            const sliced = value.slice(5).replace(":", ": ");
            let embed = new Discord.MessageEmbed()
            .setTitle("list :pencil:")
            .setDescription(sliced);
            return { embeds: [embed] };
        } else {
            return { "text": "error" };
        }
    },
    help: {
        name: "list",
        usage: "list",
        example: "list",
        desc: "list players online the server",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

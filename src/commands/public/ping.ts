import Discord, { GuildAuditLogsEntry } from "discord.js";
import { resolve } from "path/posix";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../index";

module.exports = {
    run: async (input: input2) => {
        if (!input.createdTimestamp) return;
        let embed = new Discord.MessageEmbed()
            .setTitle("Pong! :ping_pong:")
            .addField(
                "Client latency",
                `${Date.now() - input.createdTimestamp} ms`
            )
            .addField("API Latency", `${Math.round(input.client.ws.ping)} ms`);
        console.log(embed);
        input.client.taurus?.send("PING");
        let reply = await fetchLatestWithType("PONG");
        if (reply && reply.length > 5) {
            const value = reply.toString();
            const sliced = value.slice(4);
            embed.addField("Taurus Latency", `${Number(BigInt(Date.now()) - BigInt(sliced))} ms`);
            return { embeds: [embed] };
        }
        return { embeds: [embed] };
    },
    help: {
        name: "ping",
        usage: "ping",
        example: "ping",
        desc: "Shows the ping",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

import Discord, { GuildAuditLogsEntry } from "discord.js";
import { input2, response } from "../../assets/Types";
import { fetchLatestWithType } from "../../assets/Connector";

module.exports = {
    run: async (input: input2): Promise<response> => {
        return new Promise(async (resolve, reject) => {
            if (!input.createdTimestamp) return reject("No timestamp");
            let embed = new Discord.MessageEmbed()
                .setTitle("Pong! :ping_pong:")
                .addField(
                    "Client latency",
                    `${Date.now() - input.createdTimestamp} ms`
                )
                .addField(
                    "API Latency",
                    `${Math.round(input.client.ws.ping)} ms`
                );
            input.client.taurus?.send("PING");
            fetchLatestWithType("PONG")
                .then((reply) => {
                    if (reply && reply.length > 5) {
                        const value = reply.toString();
                        const sliced = value.slice(4);
                        embed.addField(
                            "Taurus Latency",
                            `${Number(BigInt(Date.now()) - BigInt(sliced))} ms`
                        );
                        return resolve({ embeds: [embed] });
                    }
                    return resolve({ embeds: [embed] });
                })
                .catch((err) => {});
        });
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

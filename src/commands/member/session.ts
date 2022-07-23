import Discord from "discord.js";
import { fetchLatestWithType } from "../../assets/Connector";
import { input2 } from "../../assets/Types";

module.exports = {
    run: async (input: input2) => {
        return new Promise(async (resolve, reject) => {
            input.client.taurus?.send("LIST_SESSIONS");
            let reply = await fetchLatestWithType("LIST_SESSIONS");
            if (reply) {
                let embed = new Discord.MessageEmbed().setTitle(
                    "Taurus Sessions"
                );
                let jsonify = JSON.parse(reply.slice(13).toString());
                for (let i = 0; i < jsonify.length; i++) {
                    let optional = "";
                    if (jsonify[i].rcon) {
                        optional += ", rcon: enabled";
                    }
                    // this is a bool but we always want to show if it's true/false, so must check if it's equal to null
                    if (jsonify[i].game.chatbridge != null) {
                        optional += `, chatbridge: ${jsonify[i].game.chatbridge}`;
                    }
                    if (jsonify[i].game.backup_interval > 0) {
                        optional += `, backup interval: ${jsonify[i].game.backup_interval} (s)`;
                    }
                    if (jsonify[i].game.backup_keep > 0) {
                        optional += `, backup keep time: ${jsonify[i].game.backup_keep} (s)`;
                    }
                    embed.addField(
                        `Name: ${jsonify[i].name}`,
                        `description: ${jsonify[i].description}, host ${jsonify[i].host}${optional}`
                    );
                }
                return resolve({ embeds: [embed] })
            }
            return reject({ text: "no sessions listed" })
        });
    },
    help: {
        name: "session",
        alias: [],
        usage: "session",
        example: "session",
        desc: "list sessions running on taurus",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [],
    },
};

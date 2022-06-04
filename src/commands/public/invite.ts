import Discord from "discord.js";
import { input2 } from "../../assets/Types";
module.exports = {
    run: (input: input2) => {
        return new Promise((resolve, reject) => { 
            let embed = new Discord.MessageEmbed()
                .setTitle("Invite for the hypnos Discord server")
                .setDescription(
                    "[Link](https://discord.gg/BKadJsM) \nCode: BKadJsM \nFull url: https://discord.gg/BKadJsM"
                );
            return resolve({ embeds: [embed] })
         })
    },
    help: {
        name: "invite",
        usage: "invite",
        example: "invite",
        desc: "Invite the Hypnos Discord server",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

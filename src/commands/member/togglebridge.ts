import Discord from "discord.js";
import { input2 } from "../../assets/Types";
//import { reconnect } from "../../index";
module.exports = {
    run: (input: input2) => {
        return new Promise((resolve, reject) => { 
            const enabled = input.client.config?.chatbridge.enabled;
            if (enabled != undefined) {
                input.client.config!.chatbridge.enabled = !enabled;
                let embed = new Discord.MessageEmbed()
                .setTitle("Chat bridge")
                .setDescription(`toggled chat bridge to ${!enabled}`);
                return { embeds: [embed] };
            } else {
                return resolve({ "text": "unable to toggle bridge, chat bridge is not set" })
            }
         })
    },
    help: {
        name: "togglebridge",
        alias: [],
        usage: "togglebridge",
        example: "togglebridge",
        desc: "toggles chat bridge entirely",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [],
    },
};

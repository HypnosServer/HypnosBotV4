import Discord from "discord.js";
import { input2 } from "../../assets/Types";
module.exports = {
    run: (input: input2) => {
        return new Promise((resolve, reject) => { 
            let embed = new Discord.MessageEmbed().setTitle("Sample be like");
            return resolve({ text: "sample", emp: false, dm: false, embeds: [embed] })
        })
    },
    help: {
        name: "test",
        alias: ["ayo"],
        usage: "test <hello>",
        example: "test yo",
        desc: "Test for things",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [
            {
                name: "test",
                description: "test option",
                required: false,
                type: "STRING" /* SUB_COMMAND
                SUB_COMMAND_GROUP
                STRING
                INTEGER
                BOOLEAN
                USER
                CHANNEL
                ROLE
                MENTIONABLE
                NUMBER*/,
            },
        ],
    },
};

import Discord from "discord.js";
import { input2 } from "../../assets/Types";
module.exports = {
    run: (input: input2) => {
        return new Promise(async (resolve, reject) => {
            let embed = new Discord.MessageEmbed().setTitle("test be like");
            return resolve({ text: "hello", emp: true, embeds: [embed] });
        });
    },
    help: {
        name: "test",
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
                required: true,
                type: "STRING",
            },
            {
                name: "test2",
                description: "test option",
                required: false,
                type: "NUMBER",
            },
        ],
    },
};

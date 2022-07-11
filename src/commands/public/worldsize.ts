import Discord from "discord.js";
import { input2 } from "../../assets/Types";
import { exec } from "child_process";

module.exports = {
    run: async (input: input2) => {
        return new Promise((resolve, reject) => {
            let embed = new Discord.MessageEmbed().setTitle("World File Size");
            let server = 0;
            for (const world of input.client.config!.worlds) {
                exec(`du -sh ${world.path}`, (error, stdout, stderr) => {
                    if (stderr || error) {
                        return reject("Unga bonga error")
                    }
                    let size = stdout.toString().split("\t");
                    if(size[0] == "") return reject("No world folder")
                    embed.addField(world.name, `${size[0]}`);
                    server++;
                    if (server >= input.client.config!.worlds.length) {
                        resolve({ embeds: [embed] })
                    }
                });
            }
        });
    },
    help: {
        name: "worldsize",
        usage: "worldsize",
        example: "worldsize",
        desc: "Shows the world sizes of attached servers",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

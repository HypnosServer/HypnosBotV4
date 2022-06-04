import Discord from "discord.js";
import { input2 } from "../../assets/Types";
const nbt = require('@bedrocker/mc-nbt');
import fs from "fs";

function search(target: string, v: { name: string, value: any }[]): any {
    for (const server of v) {
        if (server.name == target) {
            return server.value;
        }
    }
    return BigInt(0);
} 

module.exports = {
    run: async (input: input2) => {
        return new Promise(async(resolve, reject) => { 
            if (!input.client.config?.worlds) {
                return reject({ text: "unable to access world files" })
            }
            let newData: any = [];
            let oldData: any = [];
            for (const file of ["level.dat", "level.dat_old"]) {
                for (const world of input.client.config!.worlds) {
                    if(!fs.existsSync(world.path + "/" + file)){
                        return reject("unable to access world files")
                    }
                    const d = fs.readFileSync(world.path + "/" + file);
                        // if (e) return { text: `Unable to access ${file} in ${world.name}` }
                        await nbt.parse(d, (e: any, d: any) => {
                        if (e) return reject({ text: `Unable to parse ${file} in ${world.name}` })
                        const value = d.value["Data"].value["LastPlayed"].value;
                        console.log(value);
                        if (file == "level.dat") {
                            newData.push({ name: world.name, value: value });
                        } else {
                            oldData.push({ name: world.name, value: value });
                        }
                        if (oldData.length == input.client.config!.worlds.length) {
                            let embed = new Discord.MessageEmbed()
                                    .setTitle("TPS :smiling_imp:");
                            for (const server of newData) {
                                // stolen from https://github.com/Robitobi01/robi_bot/blob/master/commands/tpsCommand.py
                                const old = search(server.name, oldData);
                                const val = server.value;
                                let tps = 45.0 / (Number(val - old) / 1000.0) * 20.0;
                                tps = (tps > 20.0) ? 20.0 : tps;
                                tps = (tps < 0.0) ? 0.0 : tps;
                                embed.addField(server.name, `${tps.toFixed(1)} TPS`);
                            }
                            resolve({ embeds: [embed] })
                            //return { embeds: [embed] };
                        }
                    });
                }
            }
         })
    },
    help: {
        name: "tps",
        usage: "tps",
        example: "tps",
        desc: "Shows the tps of linked servers",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

import Discord from "discord.js";
import { input2 } from "../../assets/Types";
import fetch from 'node-fetch';

const timeout = (ms: number, promise: Promise<any>) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('TIMEOUT'))
      }, ms)
  
      promise
        .then(value => {
          clearTimeout(timer)
          resolve(value)
        })
        .catch(reason => {
          clearTimeout(timer)
          reject(reason)
        })
    })
}

const APIS = new Map([
    ["Mojang API", "https://api.mojang.com/users/profiles/minecraft/technoblade"],
    ["Minecraft Session Server", "https://sessionserver.mojang.com/session/minecraft/profile/b876ec32e396476ba1158438d83c67d4"],
    ["Minecraft Web Services", "https://api.mojang.com/users/profiles/minecraft/technoblade"]
]) 

module.exports = {
    run: async (input: input2) => {
        return new Promise(async (resolve, reject) => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Mojang/Minecraft API Status");
            for (const [k, v] of APIS) {
                await timeout(800, fetch(v)).then(data => {
                    embed.addField(k, ":white_check_mark: online");
                }).catch(_ => {
                    embed.addField(k, ":x: offline");
                });
            }
            return resolve({ embeds: [embed] })
        })
    },
    help: {
        name: "api",
        usage: "api",
        example: "api",
        desc: "list status of various Mojang/Minecraft apis",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

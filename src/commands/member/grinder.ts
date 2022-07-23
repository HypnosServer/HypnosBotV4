import Discord from "discord.js";
import { input2 } from "../../assets/Types";
module.exports = {
    run: (input: input2) => {
        return new Promise((resolve, reject) => { 
            if (input.member.roles.cache.has(input.client.config!.grinderRole)) {
                input.member.roles.add(input.client.config!.grinderRole);
                return { text: "Gave you the grinder role!" };
            } else {
                input.member.roles.cache.remove(
                    input.guild!.roles.cache.find(
                        (r) => r.id === `${input.client.config!.grinderRole}`
                    )
                );
                return resolve({ text: "Removed the grinder role for you!" })
            }
         })
    },
    help: {
        name: "grinder",
        alias: [],
        usage: "grinder",
        example: "grinder",
        desc: "Toggles grinder role",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [],
    },
};

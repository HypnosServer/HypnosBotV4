import Discord from "discord.js"
import { input2 } from "../../assets/Types"
module.exports = {
    run: (input: input2) => {
        if(input.member.roles.cache.has(input.client.config!.grinderRole)){
            input.member.roles.add(input.client.config!.grinderRole)
            return {"text": "Gave you the grinder role!"}
        }
        else {
            //console.log(msg.member.roles);
            input.member.roles.cache.remove(input.guild!.roles.cache.find(r => r.id === `${input.client.config!.grinderRole}`));
            return {"text": "Removed the grinder role for you!"}
    
        }
    },
    help: {
        name: "grinder",
        usage: "grinder",
        example: "grinder",
        desc: "Toggles grinder role",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: []
    }
}

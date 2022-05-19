import Discord from "discord.js"
import { client, input2 } from "../../assets/interfaces"
module.exports = {
    run: (input: input2) => {
        input.client.guilds.cache.get("807912058645512212")?.commands.set([])
    },
    help:{
        name:"delcoms",
        usage:"delcoms [guild id | all]",
        example: "delcoms all",
        desc: "deleting slash commands",
        group: "staff",
        staffOnly: true,
        adminOnly: false,
        memberOnly: false,
        slash: false,
        options: []
    }
}
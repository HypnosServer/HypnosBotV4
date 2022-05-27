import Discord from "discord.js"
import { input2 } from "../../assets/Types"
import countdown from "countdown"
module.exports = {
    run: (input: input2) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Age of the Hypnos server")
        .setDescription(countdown(new Date(1569559890000)).toString())
        return {"embed": [embed]}
    },
    help: {
        name: "age",
        usage: "age",
        example: "age",
        desc: "Shows the age of the Hypnos server",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: []
    }
}

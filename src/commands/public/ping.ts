import Discord from "discord.js"
import { input2 } from "../../assets/interfaces"
module.exports = {
    run: (input: input2) => {
        if(!input.createdTimestamp) return
        let embed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .addField("Client latency", `${Date.now() - input.createdTimestamp} ms`)
        .addField("API Latency", `${Math.round(input.client.ws.ping)} ms`)
        return {"text": "Pong! :ping_pong:", "embed": [embed]}
    },
    help: {
        name:"ping",
        usage:"ping",
        example: "ping",
        desc: "Shows the ping",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [
        ]
    }
}

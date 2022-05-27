import Discord from "discord.js"
import { input2 } from "../../assets/Types"
module.exports = {
    run: (input: input2) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Sample be like")
        .setTitle('Hypnos Server Hardware')
        .addField("Hypnos Main Server", "⠀")
        .addField("CPU", "Ryzen 5 5600x", true)
        .addField("RAM", "16GB DDR4 3600mhz", true)
        .addField("Drive(s)", "480GB SSD", true)
        .addField("GPU", "epic gpu i found on the floor", true)
        .addField("⠀", "⠀")
        .addField("Hypnos Secondary Server", "⠀")
        .addField("CPU", "Xeon 1245 V3", true)
        .addField("RAM", "16GB DDR3 1333mhz", true)
        .addField("Drive(s)", "2x 500GB HDD", true)
        .addField("GPU", "powerful intel igpu", true)
        .addField("⠀", "⠀")
        .addField("Hypnos Offsite/web Server","⠀")
        .addField("CPU", "Celeron J1900", true)
        .addField("RAM", "4GB DDR3L 1333mhz", true)
        .addField("Drive(s)", "500GB HDD", true)
        .addField("GPU", "crazy fast igpu", true)
        return {"embed": [embed]}
    },
    help: {
        name: "hardware",
        usage: "hardware",
        example: "hardware",
        desc: "Sends the hardware information of NotCreative's servers",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: []
    }
}

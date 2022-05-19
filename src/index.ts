// important imports
import Discord from "discord.js"
import fs from "fs"
import { commandload } from "./assets/commandloader"
import { client, config } from "./assets/interfaces"
// other important valuables
const client: client = new Discord.Client({intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]})
let config: config = JSON.parse(fs.readFileSync("./config.json").toString())
client.config = config
client.commands = new Map()

// a for loop for loading all events
let eventfolder = fs.readdirSync("./events")
for (let i = 0; i < eventfolder.length; i++) {
    require("./events/" + eventfolder[i]).run(client)
}


// a for loop running though the commands folder
fs.readdirSync("./commands").forEach(subfolder => {
    if(subfolder == "sample") return
    // a for loop for loading all commands in the sub folders
    let folder = fs.readdirSync("./commands/" + subfolder)
    for (let i = 0; i < folder.length; i++) {
        // Loads command with the command loader
        let command = new commandload(`./commands/${subfolder}/${folder[i]}`)
        client.commands!.set(command.help.name, command)
    }
})

// Logging on to the specified token in config
client.login(client.config.token)
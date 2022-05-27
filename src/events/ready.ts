import Discord from "discord.js"
import { client } from "../assets/Types"
module.exports.run = (client: client) => {
    // A on ready function
    client.on("ready", () => {
        // Logs to console for letting user know the bot is running
        console.log(`Logged in to ${client.user!.tag}`)
        // This if statement determins if a custom status is wanted
        if(client.config!.status.enabled){
            // Sets bots status as specified in config
            // client.user!.setActivity({name:"hello", type: "PLAYING"})
        }
        // loads commands when bot is ready
        client.commands?.forEach(command => {
            if(command.help.slash || command.help.slash == "both"){
                command.load(client)
            }
            
        });
    })
}
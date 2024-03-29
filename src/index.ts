// important imports
import Discord, { Client } from "discord.js";
import fs from "fs";
import { commandload } from "./assets/commandloader";
import { client, Config } from "./assets/Types";


// other important valuables
const client: any = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});
let config: Config = JSON.parse(fs.readFileSync("./config.json").toString());
client.config = config;
client.commands = new Map();
client.config.taurus_connected = false;

// Chat brigde stuff (dont touch, nc made it. So its very special, just like him)
client.messageCache = [];

process
    .on("unhandledRejection", (reason, p) => {
        console.log(`We did upsi woopsi, why it did that: ${reason}`);
        // console.log(reason, 'Unhandled Rejection at Promise', p);
    })
    .on("uncaughtException", (reason, p) => {
        console.log(`We did upsi woopsi, why it did that: ${reason}`);
    });

// load all events
let eventfolder = fs.readdirSync("./events");
for (let i = 0; i < eventfolder.length; i++) {
    require("./events/" + eventfolder[i]).run(client);
}

// run though the commands folder
fs.readdirSync("./commands").forEach((subfolder) => {
    if (subfolder == "sample") return;
    // load all commands in the sub folders
    let folder = fs.readdirSync("./commands/" + subfolder);
    for (let i = 0; i < folder.length; i++) {
        // Loads command with the command loader
        let command = new commandload(`./commands/${subfolder}/${folder[i]}`);

        if(command.help.alias){
            command.help.alias.forEach((alias: string) => {
                client.commands!.set(alias, command);
            })
        }

        client.commands!.set(command.help.name, command);
    }
});

// Logging on to the specified token in config
client.login(client.config.token).catch((err: any) => {
    console.log(
        "Uppy stupy, you need a token that isn't unky wonky and broke, like you!"
    );
});

export { client };
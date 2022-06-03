// important imports
import Discord, { Client } from "discord.js";
import fs from "fs";
import { commandload } from "./assets/commandloader";
import Connector from "./assets/Connector";
import { client, Config } from "./assets/Types";
import WebSocket from 'ws';

// other important valuables
const client: client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ],
});
let config: Config = JSON.parse(fs.readFileSync("./config.json").toString());
client.config = config;
client.commands = new Map();
client.taurus = new WebSocket(client.config.chatbridge.websocket_endpoint);
client.messageCache = [];

export function reconnect() {
    client.taurus = new WebSocket(client.config!.chatbridge.websocket_endpoint);
}

client.taurus!.onmessage = async (e: any) => {
    let msg = e.data.toString();
    //console.log(msg);
    if (msg.startsWith("MSG ") && client.config?.chatbridge.enabled && msg.length > 5) {
        client.channels.cache.get("641509498573422602").send(msg.slice(4));
    } else {
        client.messageCache?.push(msg);
    }
}
client.taurus!.onopen = async () => {
    client.taurus?.send(client.config!.chatbridge.password);
    client.taurus?.send("PING");
}

export async function fetchLatestWithType(type: string): Promise<String | void> {
    return new Promise((resolve, reject) => {
        if (!client.messageCache) {
            reject();
        }
        const cacheLength = client.messageCache!.length;
        const timeout = setTimeout(() => {
            if (client.messageCache!.length > 0 && cacheLength < client.messageCache!.length) {
                const latest = client.messageCache![client.messageCache!.length - 1];
                if (latest.length >= 1 && latest.split(" ")[0] == type) {
                    resolve(client.messageCache!.pop());
                    clearTimeout(timeout);
                }
            }
            reject();
        }, 50);
    });
}
/*
process
    .on("unhandledRejection", (reason, p) => {
        console.log(`We did upsi woopsi, why it did that: ${reason}`);
        // console.log(reason, 'Unhandled Rejection at Promise', p);
    })
    .on("uncaughtException", (reason, p) => {
        console.log(`We did upsi woopsi, why it did that: ${reason}`);
    });
*/
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
        client.commands!.set(command.help.name, command);
    }
});

// Logging on to the specified token in config
client.login(client.config.token).catch((err) => {
    console.log(
        "Uppy stupy, you need a token that isn't unky wonky and broke, like you!"
    );
});
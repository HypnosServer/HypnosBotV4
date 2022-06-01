import { client, Config } from "./Types";
import Websocket from "ws";
import { TextChannel } from "discord.js";

export default class Connector {
    private Config: Config;
    private Client: client;
    public chatbridge: boolean;
    public Connections: Websocket[] = [];
    public messageCache: String[];
    public Channel: TextChannel | undefined;
    constructor({ Config, Client }: { Config: Config; Client: client }) {
        this.chatbridge = !!Client.config && Client.config!.chatbridge.enabled;
        this.Config = Config;
        this.Client = Client;
        this.messageCache = [];
    }

    public send(data: string) {
        for (const conn of this.Connections) {
            conn.send(data);
        }
    }

    // function that connects to the websocket server
    public start() {
        this.Channel = this.Client.channels.cache.get(
            this.Config.chatbridge.channel
        ) as TextChannel;
        console.log(
            `[Chat Bridge] Trying to connect to ${this.Config.chatbridge.websocket_endpoint}`
        );
        const conn = new Websocket(this.Config.chatbridge.websocket_endpoint);
        this.Connections.push(conn);

        conn.onopen = () => {
            console.log("[Chat Bridge] established connection, authenticating");
            conn.send(this.Config.chatbridge.password);
            conn.send("PING");
            if (this.fetchLatest()) {
                console.log("[Chat Bridge] authenticated correctly");
            } else {
                console.log("[Chat Bridge] failed to authenticate correctly");
                return;
            }
            setInterval(() => {
                conn.send("HEARTBEAT");
            }, 300);
        };

        conn.onerror = (error) => {
            //this.Channel?.send(`[${Server.name}] <@313566975739822080> there is an error, godo fix!`)
            console.log(`[Chat Bridge] connection error`);
            console.log(error);
        };

        conn.onmessage = (e) => {
            //console.log(`[Chat Bridge] Message from ${Server.url}`)
            console.log("NEW MESSAGE: " + e.data);
            this.messageCache.push(e.data.toString());
        };
    }

    // probably never gonna use this
    public fetchLatest() {
        let response = null;
        setTimeout(() => {
            const messageCacheLength = this.messageCache.length;
            while (true) {
                if (messageCacheLength < this.messageCache.length && this.messageCache.length > 0) {
                    response = this.messageCache.pop();
                    break;
                }
            }
        }, 50);
        return response;
    }

    public fetchLatestWithType(type: string) {
        let response = null;
        setTimeout(() => {
            const messageCacheLength = this.messageCache.length;
            while (true) {
                if (messageCacheLength < this.messageCache.length && this.messageCache.length > 0) {
                    const latest = this.messageCache[this.messageCache.length - 1];
                    if (latest.length > 1 && latest.split(" ")[0] == type) {
                        response = this.messageCache.pop();
                        break;
                    }
                }
            }
        }, 50);
        return response;
    }

    messageDispatch(msg: string) {
        const exploded_message = msg.split(" ");
        if (exploded_message.length < 1) {
            return;
        }
        const argument = exploded_message.shift();
        switch (argument) {
            case "CHAT":
                this.Channel?.send(msg.slice(4));
                break;
            case "BACKUP":
                this.Channel?.send(msg.slice(7))
                break;
            case "HEARTBEAT":
                if (!exploded_message[0]) {
                    this.Channel?.send("GO FIX SERVER!!!!!!!!")
                }
                break;
            default: 
                console.log(`weird message: ${msg}`);
                break;
        } 
    }
}

import { client, Config } from "./Types";
import { TextChannel } from "discord.js";
const WebSocket = require('ws');
import * as Websocket from "ws";

export default class Connector {
    private Config: Config;
    private Client: client;
    public chatbridge: boolean;
    public Connections: WebSocket[] = [];
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
        console.log("sending " + data)
    }

    // function that connects to the websocket server
    public start() {
        console.log(
            `[Chat Bridge] Trying to connect to ${this.Config.chatbridge.websocket_endpoint}`
        );
        const conn = new WebSocket(this.Config.chatbridge.websocket_endpoint);
        //this.Connections.push(conn);

        conn.onopen = () => {
            console.log("[Chat Bridge] established connection, authenticating");
        };

        conn.onerror = (e: any) => {
            //this.Channel?.send(`[${Server.name}] <@313566975739822080> there is an error, godo fix!`)
            console.log(`[Chat Bridge] connection error`);
            console.log(e);
        };

        conn.onmessage = (e: any) => {
            console.log("NEW MESSAGE: " + e.data);
        };
    }

    // false means that we don't need to do anything else with the message
    messageDispatch(msg: string): boolean {
        /*
        const exploded_message = msg.split(" ");
        if (exploded_message.length < 1) {
            return false;
        }
        const argument = exploded_message.shift();
        switch (argument) {
            case "PONG":
                this.chatbridge = true;
                console.log("s");
                return false;
            case "MSG ":
                console.log("Ms " + msg);
                //this.Channel?.send(msg.slice(3));
                return false;
            case "BACKUP":
                //this.Channel?.send(msg.slice(7))
                return false;
            case "HEARTBEAT":
                if (exploded_message[0] == "false") {
                    // this.Channel?.send("GO FIX SERVER!!!!!!!!")
                }
                console.log(msg);
                return false;
            default: 
                console.log(`weird message: ${msg}`);
                break;
        } 
        */
        return true;
    }
}

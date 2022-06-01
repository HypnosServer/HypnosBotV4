import { client, Config } from "./Types";
import Websocket from "ws";
import { TextChannel } from "discord.js";

export default class ChatBridge {
    private Config: Config;
    private Client: client;
    public Connections: Websocket[] = [];
    public Channel: TextChannel | undefined;
    constructor({ Config, Client }: { Config: Config; Client: client }) {
        this.Config = Config;
        this.Client = Client;
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
            conn.send(this.Config.chatbridge.password);
            console.log(`[Chat Bridge] Connected to ${Server.url}`);
            this.Channel?.send(`[${Server.name}] Successfully connected`);
        };

        conn.onerror = (error) => {
            //this.Channel?.send(`[${Server.name}] <@313566975739822080> there is an error, godo fix!`)
            console.log(`[Chat Bridge] connection error`);
            for (const conn of this.Connections) {
                conn.close();
            }
            console.log(error);
        };

        conn.onmessage = (e) => {
            //console.log(`[Chat Bridge] Message from ${Server.url}`)
            console.log(e.data);
        };
    }
}

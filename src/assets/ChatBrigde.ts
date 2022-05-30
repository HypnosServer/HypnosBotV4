import { client, Config } from './Types';
import Websocket from "ws";
import { TextChannel } from 'discord.js';

export default class ChatBridge{
    private Config: Config
    private Client: client
    public Connections: Websocket[] = []
    public Channel: TextChannel | undefined
    constructor({Config, Client}: {Config: Config, Client: client}){
        this.Config = Config
        this.Client = Client
    }

    // function that connects to the websocket server
    public start(){
        this.Channel = (this.Client.channels.cache.get(this.Config.chatbridge.channel) as TextChannel)
        console.log("Starting ChatBridge")
        this.Channel.send("Starting Chat Bridge")
        this.Config.chatbridge.servers.forEach(Server => {
            console.log(`[Chat Brigde] Trying to connect to ${Server.url}`)
            const Connection = new Websocket(Server.url)
            this.Connections.push(Connection)

            Connection.onopen = () => {
                Connection.send("PING") 
                Connection.send("PING") 
                Connection.send("PING") 
                Connection.send("PING") 
                console.log(`[Chat Bridge] Connected to ${Server.url}`);
                this.Channel?.send(`[${Server.name}] Successfully connected`)
            }

            Connection.onerror = (error) => {
                this.Channel?.send(`[${Server.name}] <@313566975739822080> there is an error, godo fix!`)
                console.log(`[Chat Bridge] Error on ${Server.url}`)
                console.log(error)
            }

            Connection.onmessage = (e) => {
                console.log(`[Chat Bridge] Message from ${Server.url}`)
                console.log(e.data)
            }
        });
    }
}
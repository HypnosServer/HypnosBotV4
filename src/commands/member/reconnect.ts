import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType, reconnect } from "../../index";

module.exports = {
    run: async (input: input2) => {
        reconnect();
        input.client.taurus?.send("PING");
        let reply = await fetchLatestWithType("PONG");
        if (reply && reply.length > 5) {
            return { "text": "restarted connection" };
        } else {
            return { "text": "failed to reconnect, is taurus down?" };
        }
        
    },
    help: {
        name: "reconnect",
        usage: "reconnect",
        example: "reconnect",
        desc: "reconnects websocket between taurus and HypnosBotV4",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [],
    },
};

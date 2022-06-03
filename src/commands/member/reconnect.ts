import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
import { reconnect } from "../../index";

module.exports = {
    run: (input: input2) => {
        reconnect();
        return { "text": "restarted connection" };
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

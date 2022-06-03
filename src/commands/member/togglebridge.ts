import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
//import { reconnect } from "../../index";
module.exports = {
    run: (input: input2) => {
        const enabled = input.client.config?.chatbridge.enabled;
        if (enabled != undefined) {
            input.client.config!.chatbridge.enabled = !enabled;
            return { "text": `toggled chat bridge to ${!enabled}` };
        } else {
            return { "text": "unable to toggle bridge, chat bridge is not set" };
        }
    },
    help: {
        name: "togglebridge",
        usage: "togglebridge",
        example: "togglebridge",
        desc: "toggles chat bridge entirely",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [],
    },
};

import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../index";

module.exports = {
    run: async (input: input2) => {
        if (
            !input.args ||
            input.args.length != 1
        ) {
            return { text: "invalid arugments" };
        }
        // hella untested
        input.client.taurus?.send(`CMD ${input.args[0]} C-c`);
        input.client.taurus?.send(`CMD ${input.args[0]} Up`);
        const reply = await fetchLatestWithType("CMD");
        if (reply) {
            input.channel?.send(`error: ${reply.slice(4)}`);
        }
        return { text: `sent restart to ${input.args[0]}` };
    },
    help: {
        name: "restart",
        usage: "restart <server>",
        example: "restart CMP",
        desc: "force restart server",
        group: "public",
        staffOnly: false,
        adminOnly: true,
        memberOnly: false,
        slash: "both",
        options: [
            {
                name: "options",
                description: "server name",
                required: true,
                type: "STRING",
            },
        ],
    },
};

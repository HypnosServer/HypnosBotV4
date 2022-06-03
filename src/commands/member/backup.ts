import Discord from "discord.js";
import Connector from "../../assets/Connector";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../index";

async function gatherReply(input: input2, type: string) {
    const reply = await fetchLatestWithType(type);
    if (reply && reply.toString().length > 0) {
        const value = reply.toString();
        const sliced = value.slice(type.length + 1);
        return { "text": sliced };
    } else {
        return { "text": "error" };
    }
}

module.exports = {
    run: async (input: input2) => {
        if (!input.args || input.args.length == 0) {
            return { "text": "expected arguments" };
        }
        const args = input.args!;
        switch (args[0]) {
            case "ls":
                input.client.taurus?.send("LIST_BACKUPS");
                return await gatherReply(input, "LIST_BACKUPS");
            case "list":
                input.client.taurus?.send("LIST_BACKUPS");
                return await gatherReply(input, "LIST_BACKUPS");
            case "rm":
                if (args.length != 2) {
                    input.channel?.send("expected backup name, please see backup ls");
                    break;
                }
                input.client.taurus?.send("RM_BACKUP " + args[1]);
                return await  gatherReply(input, "RM_BACKUP");
            case "remove":
                if (args.length != 2) {
                    return { "text": "expected backup name, please see backup ls" };
                }
                input.client.taurus?.send("RM_BACKUP " + args[1]);
                return await gatherReply(input, "RM_BACKUP");
            case "new":
                if (args.length != 2) {
                    return { "text": "expected session name" };
                }
                input.client.taurus?.send("BACKUP " + args[1]);
                //fetchLatestWithType("BACKUP");
                return { "text": "todo" };
            default:
                return { "text": "invalid arguments, see help" };
        }
        return { "text": "invalid arguments!" };
    },
    help: {
        name: "backup",
        usage: "backup",
        example: "backup ls",
        desc: "manage backups",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [   
            {
                name: "options",
                description: "choose between ls, new, and rm",
                required: false,
                type: "STRING",
            }
        ],
    },
};

import Discord from "discord.js";
import { input2 } from "../../assets/Types";
import { fetchLatestWithType } from "../../assets/Connector";

async function gatherReply(input: input2, type: string) {
    return new Promise(async (resolve, reject) => {
        fetchLatestWithType(type).then(reply => {
            if (reply && reply.toString().length > 0) {
                const value = reply.toString();
                const sliced = value.slice(type.length + 1);
                let embed = new Discord.MessageEmbed()
                    .setTitle("Backup")
                    .setDescription(sliced);
                return resolve({ embeds: [embed] })
            } else {
                return resolve({ text: "error" })
            }
        })
    });
}

module.exports = {
    run: async (input: input2) => {
        return new Promise(async (resolve, reject) => {
            let option: string
            if(input.args) option = input.args[0]
            if(input.options) option = input.options.get("options")?.value?.toString()!

            if (!option!) {
                return reject({ text: "expected arguments" })
            }
            let args: string
            if(input.args) args = input.args[1]
            if(input.options) args = input.options.get("name")?.value?.toString()!
            switch (option) {
                case "ls":
                    input.client.taurus?.send("LIST_BACKUPS");
                    return resolve(await gatherReply(input, "LIST_BACKUPS"))
                case "list":
                    input.client.taurus?.send("LIST_BACKUPS");
                    return resolve(await gatherReply(input, "LIST_BACKUPS"))
                case "rm":
                    if (!args!) {
                        reject(
                            "expected backup name, please see backup ls"
                        );
                        break;
                    }
                    input.client.taurus?.send("RM_BACKUP " + args);
                    return resolve(await gatherReply(input, "RM_BACKUP"))
                case "remove":
                    if (!args!) {
                        return resolve({
                            text: "expected backup name, please see backup ls",
                        })
                    }
                    input.client.taurus?.send("RM_BACKUP " + args);
                    return resolve(await gatherReply(input, "RM_BACKUP"))
                case "new":
                    if (!args!) {
                        return resolve({ text: "expected session name" })
                    }
                    input.client.taurus?.send("BACKUP " + args);
                    //fetchLatestWithType("BACKUP");
                    return resolve({ text: "todo" })
                default:
                    return resolve({ text: "invalid arguments, see help" })
            }
            return resolve({ text: "invalid arguments!" })
        })
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
                required: true,
                type: "STRING",
            },
            {
                name: "name",
                description: "Name of the backup",
                required: true,
                type: "STRING",
            }
        ],
    },
};

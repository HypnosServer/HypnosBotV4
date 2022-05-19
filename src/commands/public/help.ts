import Discord from "discord.js"
import { input2 } from "../../assets/interfaces"
module.exports = {
    run: (input: input2) => {
        let search: string | null | undefined;
        if(input.args) search = input.args.join(" ")
        if(input.options) search = input.options.getString("option")
        let categories: string[] = ["public", "member", "admin"]
        if(!search) {
            return {"text": "okay you new"}
        } else if(search == "staff" && input.client.config.staff.includes(input.user.id)) {
            return {"text": "Hello staff!"}
        } else if(categories.includes(search)){
            return {"text": "you got the category"}
        } else if(input.client.commands?.get(search)){
            let command = input.client.commands?.get(search)?.help
            if(!command) return {"text": "big error"}
            let embed = new Discord.MessageEmbed()
            .setTitle(command.name)
            .setDescription(command.desc)
            .addField("alias", command.alias ? command?.alias.join(" ") : "none", true)
            .addField("Group", command.group, true)
            .addField('Amount of slash options', command.options?.length.toString() ?? "None")
            .addField("Use", command.usage, true)
            .addField("Example", command.example, true)
            .addField("Slash enabled", command.slash.toString())
            .addField("Member only", command.memberOnly ? "true": "false", true)
            .addField("Admin only", command.adminOnly ? "true": "false", true)
            return {"text": "You chose a command", "embed": [embed]}
        } else {
            return {"text": "You cant spell!"}
        }
    },
    help: {
        name:"help",
        usage:"help <command | category>",
        example: "help ping",
        desc: "Help command",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [
            {
                name: "option",
                description: "Get info for command or category",
                required: false,
                type: "STRING"
            }
        ]
    }
}

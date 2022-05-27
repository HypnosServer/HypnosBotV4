import Discord from "discord.js"
import { input2 } from "../../assets/Types"
module.exports = {
    run: (input: input2) => {
        let search: string | null | undefined;
        if(input.args) search = input.args.join(" ")
        if(input.options) search = input.options.getString("option")
        let categories: string[] = ["public", "member", "admin"]
        if(!search) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Help for ${input.client.config?.botname}`)
            .setDescription("Use `help <category>` to get help on a specific category. \nOr use `help <command>` to get help on a specific command. \nCategories:")
            .addField("Public", "Here is all commands everyone can use.")
            .addField("Member", "Here is all commands only members can use.")
            .addField("Admin", "Here is all commands only admins can use.")
            return {"text": "Here is help for you!", "embed": [embed]}
        } else if(search == "staff" && input.client.config?.staff.includes(input.user.id)) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Commands for ${search}`)
            
            let commandText = "<Optional> [Required]\n"
            
            // get all commands in category with all properties
            input.client.commands!.forEach((command, name) => {
                if(command.help.group == search) {
                    commandText += `\n\`${command.help.usage}\` ${command.help.desc}`
                }
            })
            embed.setDescription(commandText)

            return {"text": "Hello staff", "embed": [embed]}
        } else if(categories.includes(search)){
            let embed = new Discord.MessageEmbed()
            .setTitle(`Commands for ${search}`)
            
            let commandText = "<Optional> [Required]\n"
            
            // get all commands in category with all properties
            input.client.commands!.forEach((command, name) => {
                if(command.help.group == search) {
                    commandText += `\n\`${command.help.usage}\` ${command.help.desc}`
                }
            })
            embed.setDescription(commandText)

            return {"text": "Here is help for you!", "embed": [embed]}
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
            .addField("Options", command.options?.length ? command.options?.map(option => `\`${option.name}\` ${option.description}`).join("\n")! : "None")
            return {"text": "You chose a command", "embed": [embed]}
        } else {
            return {"text": "Couldn't find that command/category"}
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
                name: "command-category",
                description: "Get info for command or category",
                required: false,
                type: "STRING"
            }
        ]
    }
}

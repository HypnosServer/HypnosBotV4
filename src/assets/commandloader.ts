// Imports
import { client, help, input, input2, response } from "../assets/interfaces"

export class commandload{
    // Some values
    private data: { help: help, run: Function}
    public help: help

    // Constructor that assing valuables from the inputted path
    constructor(path: string) {
        this.data = require("../"+ path)
        this.help = this.data.help
        
    }

    public load(client:client){
        // loads command to test server
        client.guilds.cache.get("807912058645512212")?.commands.create({
            name: this.help.name,
            description: this.help.desc,
            options: this.help.options ?? undefined,
            type: "CHAT_INPUT"
        })
    }

    // Function that parses msg or interaction and defines it to one value then runs the command with that value
    public run(input:input){
        // merges msg and interaction to one value
        let input2:input2;
        if(input.msg){
            input2 = {
                channel: input.msg.channel,
                guild: input.msg.guild,
                id: input.msg.id,
                inguild: input.msg.inGuild(),
                member: input.msg.member,
                type: input.msg.type,
                user: input.msg.author,
                activity: input.msg.activity,
                attachments: input.msg.attachments,
                content: input.msg.content,
                createdAt: input.msg.createdAt,
                createdTimestamp: input.msg.createdTimestamp,
                delete: input.msg.delete,
                embeds: input.msg.embeds,
                mentions: input.msg.mentions,
                react: input.msg.react,
                msg: input.msg,
                args: input.args,
                client: input.client
            }
        }else {
            if(!input.interaction) return
            if(!input.interaction?.isCommand()) return
            input2 = {
                channel: input.interaction.channel,
                guild: input.interaction.guild,
                id: input.interaction.id,
                inguild: input.interaction.inGuild(),
                isbutton: input.interaction.isButton(),
                iscommand: input.interaction.isCommand(),
                member: input.interaction.member,
                type: input.interaction.type,
                user: input.interaction.user ,
                createdAt: input.interaction.createdAt,
                createdTimestamp: input.interaction?.createdTimestamp,
                interaction: input.interaction,
                client: input.client,
                options: input.interaction.options
            }
        }
        
        // runs command, and saves response to value
        let respose: response = this.data.run(input2)
        // checks and handels response
        if(respose){
            if(respose.embed){
                respose.embed.forEach(embed => {
                    if(!input2.client.config?.embed.color || !input2.client.config.embed.footer) return
                    embed
                    .setColor(input2.client.config?.embed.color)
                    .setFooter(input2.client.config.embed.footer)
                })
            }
            if(input.msg){
                if(respose.dm == true){
                    console.log("bruh")
                    input.msg.author.send({content: respose.text, embeds: respose.embed})
                    input.msg.channel.send("In your dms")
                    return
                }
                input.msg.channel.send({content: respose.text, embeds: respose.embed})
                return
            }else {
                if(!input.interaction) return
                if(!input.interaction?.isCommand()) return
                // input2.options = input.interaction.options
                if(respose.dm == true){
                    console.log("bruh2")
                    input.interaction.user.send({content: respose.text, embeds: respose.embed})
                    input.interaction.reply({content: "In your dms", ephemeral: true})
                    return
                }
                input.interaction.reply({content: respose.text, embeds: respose.embed, ephemeral: respose.emp})
                return
            }
        }
    }
}
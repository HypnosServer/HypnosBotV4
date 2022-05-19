import Discord from "discord.js"
import { input2 } from "../../assets/interfaces"
module.exports = {
    run: (input: input2) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Sample be like")
        return {"text": "sample", "emp": false,"dm": false, "embed": [embed]}
    },
    help: {
        name:"test",
        usage:"test <hello>",
        example: "test yo",
        desc: "Test for things",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [
            {
                name: "test",
                description: "test option",
                required: false,
                type: "STRING" /* SUB_COMMAND
                SUB_COMMAND_GROUP
                STRING
                INTEGER
                BOOLEAN
                USER
                CHANNEL
                ROLE
                MENTIONABLE
                NUMBER*/
            }
        ]
    }
}

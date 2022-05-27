import Discord from "discord.js"
import { input2 } from "../../assets/Types"
module.exports = {
    run: (input: input2) => {
        return {"text": "TPS is 20 ofc you dummy - Feature coming soon"}
    },
    help: {
        name: "tps",
        usage: "tps",
        example: "tps",
        desc: "Shows the tsp of the SMP server",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: []
    }
}

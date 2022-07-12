import Discord from "discord.js";
import { input2 } from "../../assets/Types";
module.exports = {
    run: (input: input2) => {
        return new Promise((resolve, reject) => {
            let embed = new Discord.MessageEmbed()
                .setTitle("Website")
                .setDescription(
                    "[Main site](http://hypnos.ws)\n[About page](http://hypnos.ws/pages/about)\n[Map](http://108.192.154.185:5000)"
                );
            return resolve({ embeds: [embed] });
        });
    },
    help: {
        name: "website",
        usage: "website",
        example: "website",
        desc: "Gives links to the main site and sub pages",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

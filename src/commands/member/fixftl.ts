import Discord from "discord.js";
import { input2 } from "../../assets/Types";
module.exports = {
    run: (input: input2) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("Oh No, Our FTL, It's Broken")
            .setDescription(
                "ANTHJONY WOULD YOU PLEASE FIX THE FTL RTIGHT FUCKING NOW SO WE CAN GO FUCK OUR MOM WIGOUT HAVING YTO LFY OUT TO HER SD BIG AS DAFAT ASSSSSS"
            )
            .addField("Reason:", "your mom sat on it")
            .addField(
                "Who broke it",
                Math.random() * 100 < 25
                    ? "chez ofc"
                    : Math.random() * 100 < 25
                    ? "A1306"
                    : Math.random() * 100 < 25
                    ? "NC"
                    : Math.random() * 100 < 25
                    ? "Trekker"
                    : "Noone :flushed:"
            )
            .addField("Fixed when?", "ASAP ANOTHIIONY");
        return { text: "<@867896413602054175>", embed: [embed] };
    },
    help: {
        name: "fixftl",
        usage: "fixftl",
        example: "fixftl",
        desc: "This command wil automatically fix the fix within 3-173 business days",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: true,
        slash: "both",
        options: [],
    },
};

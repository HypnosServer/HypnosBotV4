import Discord from "discord.js";
import { input2 } from "../../assets/Types";
const nbt = require("@bedrocker/mc-nbt");
import fs from "fs";
// change to import somehow
const sharp = require("sharp");

module.exports = {
    run: async (input: input2) => {
        return new Promise(async (resolve, reject) => {
            let path = "";
            for (const world of input.client.config!.worlds) {
                if (world.name == "SMP") {
                    path = world.path;
                }
            }
            if (path.length < 1) {
                let embed = new Discord.MessageEmbed().setTitle(
                    "Score: " + input.args!.join(" ")
                );
                embed.setDescription("Unable to find location of world file");
                return reject({ embeds: [embed] });
            }
            let whitelist_path = path.split("/");
            whitelist_path.pop();
            let base_path = whitelist_path.join("/");
            let data = fs.readFileSync(path + "/data/scoreboard.dat");
            fs.stat(base_path + "/board.svg", (e, s) => {
                if (s && !e) {
                    fs.unlinkSync(base_path + "/board.svg");
                }
            });
            fs.stat(base_path + "/board.png", (e, s) => {
                if (s && !e) {
                    fs.unlinkSync(base_path + "/board.png");
                }
            });
            let whitelist_data = fs.readFileSync(base_path + "/whitelist.json");
            let whitelistJSON = JSON.parse(whitelist_data.toString());
            let whitelist: any[] = [];
            for (let i = 0; i < whitelistJSON.length; i++) {
                whitelist.push(whitelistJSON[i].name);
            }

            const svg1 = '<svg viewBox="0 0 ';
            const svg2 =
                '" xmlns="http://www.w3.org/2000/svg">\
                <defs>\
                    <style>\
                        @font-face {\
                            font-family: minecraft;\
                            src: url(\'' +
                base_path +
                '/minecraft.ttf\');\
                        }\
                    </style>\
            </defs>\
                <style>\
                    text {\
                        font-family: minecraft;\
                    }\
                    .title {\
                        text-anchor: middle;\
                        font-size: 20px;\
                        fill: #FFFFFF;\
                    }\
                    .score {\
                        text-anchor: end;\
                        font-size: 20px;\
                        fill: #FF5555;\
                    }\
                    .ign {\
                        text-anchor: start;\
                        font-size: 20px;\
                        fill: #BFBFBF;\
                    }\
                </style>\
                <rect height="100%" width="100%" fill="#36393F"></rect>\
                <text class="title" x="50%" y="20">';
            const svg3 = "</text>";

            // Read nbt scoreboard file.
            await nbt.parse(data, async (e: any, d: any) => {
                if (e)
                    return reject({ text: `Unable to parse scoreboard file` });

                // Removes unwhitelisted players unless otherwise specified. Also removes "Total" player if it exists.
                let scoreboardData = d.value.data.value;

                let scoreboard: any = {};
                let scores = scoreboardData.PlayerScores.value.value;
                for (let i = 0; i < scores.length; i++) {
                    if (
                        scores[i].Score.value != 0 &&
                        scores[i].Objective.value == input.args![0] &&
                        scores[i].Name.value != "Total" &&
                        (input.content!.split(" ").length > 2 ||
                            whitelist.indexOf(scores[i].Name.value) >= 0)
                    ) {
                        scoreboard[scores[i].Name.value] =
                            scores[i].Score.value;
                    }
                }
                // Sort the scoreboard
                scoreboard = Object.keys(scoreboard).map(function (key) {
                    return [key, scoreboard[key]];
                });
                scoreboard.sort(function (first: any, second: any) {
                    return second[1] - first[1];
                });
                // Calculate the total
                let total = 0;
                for (let i = 0; i < scoreboard.length; i++) {
                    total += scoreboard[i][1];
                }
                // Adding the total to the top of the players
                scoreboard.unshift(["Total", total]);
                let svg =
                    svg1 +
                    300 +
                    " " +
                    (25 + 20 * scoreboard.length) +
                    svg2 +
                    input.args![0] +
                    svg3;
                let position = 0;
                for (const [k, v] of scoreboard) {
                    if (k == "Total") {
                        svg +=
                            '<text style="text-anchor: start; font-size: 20px; fill: #FFFFFF;" x="3" y="' +
                            (40 + 20 * position) +
                            '">' +
                            k +
                            "</text>";
                    } else {
                        svg +=
                            '<text class="ign" x="3" y="' +
                            (40 + 20 * position) +
                            '">' +
                            k +
                            "</text>";
                    }
                    svg +=
                        '<text class="score" x="100%" y="' +
                        (40 + 20 * position) +
                        '">' +
                        v +
                        "</text>";
                    position += 1;
                }
                svg += "</svg>";
                await fs.writeFile(base_path + "/board.svg", svg, async () => {
                    await sharp(base_path + "/board.svg")
                        .png()
                        .toFile(base_path + "/board.png")
                        .then(() => {
                            input.channel!.send({
                                files: [base_path + "/board.png"],
                            });
                        });
                });
            });
        });
    },
    help: {
        name: "iscore",
        alias: [],
        usage: "iscore",
        example: "iscore",
        desc: "Displays specified scoreboard as an image",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

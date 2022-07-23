import Discord from "discord.js";
import { input2 } from "../../assets/Types";
const nbt = require("@bedrocker/mc-nbt");
import fs from "fs";

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
            let whitelist_data = fs.readFileSync(
                whitelist_path.join("/") + "/whitelist.json"
            );
            let whitelistJSON = JSON.parse(whitelist_data.toString());
            let whitelist: any[] = [];
            for (let i = 0; i < whitelistJSON.length; i++) {
                whitelist.push(whitelistJSON[i].name);
            }
            let data = fs.readFileSync(path + "/data/scoreboard.dat");
            // Read nbt scoreboard file.
            await nbt.parse(data, (e: any, d: any) => {
                if (e)
                    return reject({ text: `Unable to parse scoreboard file` });

                // Removes unwhitelisted players unless otherwise specified. Also removes "Total" player if it exists.
                let scoreboardData = d.value.data.value;

                let scoreboard: any = {};
                let scores = scoreboardData.PlayerScores.value.value;
                console.log(scores.length);
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
                let converted_total = total + ` (${(total / 1000000).toFixed(1)} m)`
                // Adding the total to the top of the players
                scoreboard.unshift(["Total", converted_total]);
                let players = [];
                let scoresForPlayers = [];
                let player_length = 0;
                let score_length = 0;
                let messages = 1;
                for (const [k, v] of scoreboard) {
                    // console.log(`${k} - ${v}`)
                    player_length += k.length;
                    score_length += v.length;
                    if (
                        player_length / 900.0 > messages ||
                        score_length / 900.0 > messages
                    ) {
                        messages++;
                        player_length = 0;
                        score_length = 0;
                        players.push("|");
                        scoresForPlayers.push("|");
                    }
                    players.push(k);
                    scoresForPlayers.push(v);
                }
                let player_string = players
                    .join("\n")
                    .replace("_", "\_")
                    .split("|");
                let score_string = scoresForPlayers.join("\n").split("|");
                console.log(`${player_string.length} - ${score_string.length}`);
                let scoreboard_embeds = [];
                for (let i = 0; i < player_string.length; i++) {
                    let score_name = "Score: " + input.args!.join(" ");
                    if (player_string.length > 1) {
                        score_name += ` [${i + 1}/${player_string.length}]`;
                    }
                    let embed = new Discord.MessageEmbed().setTitle(score_name);
                    embed.addField("Players", player_string[i], true);
                    embed.addField("Scores", score_string[i], true);
                    scoreboard_embeds.push(embed);
                }
                resolve({ embeds: scoreboard_embeds });
            });
        });
    },
    help: {
        name: "score",
        alias: [],
        usage: "score",
        example: "score",
        desc: "displays specified scoreboard as an embed",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};

import {client} from "../index"
import WebSocket from "ws";
import fs from "fs";
const nbt = require("@bedrocker/mc-nbt");


const fuzzy_accuracy = 0.7;

const fuzzy = (possible: string[], term: string, accuracy: number) => {
	if (possible.indexOf(term) >= 0) {
		return term;
	}
	for (const board of possible) {
		let matches = 0;
		for (let i = 0; i < term.length; i++) {
			board.indexOf(term[i]) >= 0 ? matches++ : matches--;
		}
		if (matches / board.length >= accuracy || term.trim() == "") {
			return board;
		}
	}
}

const genScoreCache = (server: string) => {
	let path = "";
	for (const world of client.config!.worlds) {
		if (world.name == server) {
			path = world.path;
		}
	}
	if (path.length < 1) {
		// unable to find worldfile
		return path;
	}
	fs.stat("./scoreboards.txt", async (e, _) => {
		if (!e) {
			return;
		}
		const data = fs.readFileSync(path + "/data/scoreboard.dat");
		await nbt.parse(data, (e: any, d: any) => {
			// unable to parse scoreboard file
			if (e) return;
			let scoreboards: Set<String> = new Set([]);
			let scoreboardSavable = [];
			const scores = d.value.data.value.PlayerScores.value.value;
			for (let i = 0; i < scores.length; i++) {
				const name = scores[i].Objective.value.toString();
				if (scoreboards.has(name)) {
					continue;
				}
				scoreboards.add(name);
				scoreboardSavable.push(name.toLowerCase());
			}
			fs.writeFileSync("./scoreboards.txt", scoreboardSavable.join("|"));
		})
	})
	return path;
}

export function reconnect() {
    client.taurus = new WebSocket(client.config!.chatbridge.websocket_endpoint);
    client.taurus!.onmessage = async (e: any) => {
        let msg = e.data.toString();
        if (msg.startsWith("MSG ") && client.config?.chatbridge.enabled && msg.length > 5) {
			let server = msg.slice(4);
			if (!server.startsWith("[")) {
				client.channels.cache.get("641509498573422602").send(server);
				return;
			} else {
				server = server.slice(1);
			}
			const ending = server.indexOf("]");
			server = server.slice(0, ending);
			const line = msg.slice(6 + server.length).trim();
			const endUsername = line.indexOf(">");
			if (endUsername < 0) {
				return;
			}
			const sliced = line.slice(endUsername + 2);
			if (sliced.trim().startsWith(client.config?.inGamePrefix)) {
				const command = sliced.split(" ")[0].slice(client.config?.inGamePrefix.length);
				// need to replace in future, only supports 1 argument because of pop()
				const args = sliced.split(" ").pop();
				switch (command) {
					case "score":
						if (sliced.split(" ").length < 1) {
							return;
						}
						genScoreCache(server);
						const scoreboards = fs.readFileSync("./scoreboards.txt",{encoding:'utf8', flag:'r'}).split("|");
						const lower = args.toLowerCase();
						client.taurus!.send(`RCON ${server} scoreboard objectives setdisplay sidebar ${fuzzy(scoreboards, lower, fuzzy_accuracy)}`);
						break;
					case "updateScoreboards":
						fs.stat("./scoreboards.txt", async (e, _) => {
							if (!e) {
								fs.unlink("./scoreboards.txt", (err: any) => {
									if (err) console.log("failed to unlink scoreboards.txt");
								})
							}
						})
						genScoreCache(server);
						break;
					case "total":
						if (sliced.split(" ").length < 1) {
							return;
						}
						const scoreboard = fs.readFileSync("./scoreboards.txt",{encoding:'utf8', flag:'r'}).split("|");
						const lowerarg = args.toLowerCase();
						const board = fuzzy(scoreboard, lowerarg, fuzzy_accuracy);
						const path = genScoreCache(server);
						let data = fs.readFileSync(path + "/data/scoreboard.dat");
						// Read nbt scoreboard file.
						await nbt.parse(data, (e: any, d: any) => {
							if (e) return;
							const allData = d.value.data.value.PlayerScores.value.value;
							let total = 0;
							for (const dp of allData) {
								if (dp.Objective.value == board && dp.Name.value.toLowerCase() != "total") {
									total += dp.Score.value;
								}
							}
							client.taurus.send(`RCON ${server} scoreboard players add Total ${board} ${total}`);
						})
						break;
					default:
						break;
				}
			}
            client.channels.cache.get("641509498573422602").send(msg.slice(4));
        } else {
            client.messageCache?.push(msg);
        }
    }
    client.taurus!.onopen = async () => {
        console.log("Connecting to Taurus");
        client.taurus?.send(client.config!.chatbridge.password);
        console.log("authenticating...");
        client.taurus?.send("PING");
        await fetchLatestWithType("PONG");
    }
}

export async function fetchLatestWithType(type: string): Promise<String | void> {
    return new Promise((resolve, reject) => {
        if (!client.messageCache) {
            return reject("No message cache");
        }
        const cacheLength = client.messageCache!.length;
        let tries = 0;
        const tryThing = () => {
            if(client.messageCache!.length > 0 && cacheLength < client.messageCache!.length) {
                const latest = client.messageCache![client.messageCache!.length - 1];
                if (latest.length >= 1 && latest.split(" ")[0] == type) {
                    if (!client.config.taurus_connected) {
                        console.log("Taurus connected successfully");
                        client.config.taurus_connected = true;
                    }
                    return resolve(client.messageCache!.pop());
                }
            }
            tries++;
            if (tries > 5) {
                return reject("Timeout");
            }
            setTimeout(tryThing, 500);
        }
        setTimeout(() => {
            tryThing()
        }, 20);
    });
}

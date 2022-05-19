"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.run = (client) => {
    // A on ready function
    client.on("ready", () => {
        var _a;
        // Logs to console for letting user know the bot is running
        console.log(`Logged in to ${client.user.tag}`);
        // This if statement determins if a custom status is wanted
        if (client.config.status.enabled) {
            // Sets bots status as specified in config
            // client.user!.setActivity({name:"hello", type: "PLAYING"})
        }
        // loads commands when bot is ready
        (_a = client.commands) === null || _a === void 0 ? void 0 : _a.forEach(command => {
            if (command.help.slash || command.help.slash == "both") {
                command.load(client);
            }
        });
    });
};

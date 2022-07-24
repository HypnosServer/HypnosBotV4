# HypnosBot V4

This is the repository of the Discord bot that we use on the Hypnos server. More description here nc!
This is for the [Discord server](https://discord.com/invite/2gpsaf2Ve8)

<img src="https://cdn.discordapp.com/attachments/627196903808827422/774357157033672724/BannerNoBackground.png" alt="drawing" width="750"/>


## Features

- 22 commands
- Chat brigde between minecraft and discord with [Taurus](https://github.com/notseanray/taurus)
- Run commands ingame from discord
- Easy to add commands with provided command loader
- Promise based commands



## Commands
This bot has 22 commands that are in 3 different categories: Public, member and staff

### Public
Everyone can use these commands.
- Age | Shows the age of the Hypnos server
- Api | List status of various Mojang/Minecraft apis
- Hardware | Sends the hardware information of NotCreative's servers
- Help | Help command
- Invite | Invite the Hypnos Discord server
- Iscore | Displays specified scoreboard as an image
- List | List players online the server
- Ping | Shows the ping
- Role | List all the users that have the role
- Score | Displays specified scoreboard as an embed
- Tps | Shows the tps of linked servers
- Website | Gives links to the main site and sub pages
- Worldsize | Shows the world sizes of attached servers

### Member
Only users with the role specified in the config can use these commands.
- Backup | Manage backups
- FixFTL | This command wil automatically fix the fix within 3-173 business days
- Grinder | Toggles grinder role
- Reconnect | Reconnects websocket between [Taurus](https://github.com/notseanray/taurus) and HypnosBot V4
- Session | List sessions running on [Taurus](https://github.com/notseanray/taurus)
- ToggleBrigde | Toggles chat bridge entirely

### Staff
Only users with the role specified in the config can use these commands.
- Delcoms | Deleting slash commands
- Execute | Execute command via rcon
- Restart | Force restart server

## Installation

Install HypnosBot V4 with npm

```bash
  npm i
```
    
## Deployment

To deploy this project run

```bash
    cd src
    ts-node index.ts
```


## Roadmap

- Add more commands
    - Add command command
    - Reload command
    - locations
    - map integration

## Authors
The bot is by: 
- Github: [@AFunkyMonk](https://github.com/AFunkyMonk) Discord: AFunkyMonk#9467
- Github: [@notseanray](https://github.com/notseanray) Discord: NotCreative#0041

And [Taurus](https://github.com/notseanray/taurus) is by:
- Github: [@notseanray](https://github.com/notseanray) Discord: NotCreative#0041

## Related

Here are some related projects by other Minecraft tech servers

#### Typescript
[EndTech](https://github.com/samipourquoi/endbot)

#### Javascript
[Quacon](https://github.com/Sylk0s/quacon-bot)

#### Rust
[ProtoTech](https://github.com/ProtoTechMC/ProtoBot2) (WIP)

#### Python
[Chronos](https://github.com/ChronosServer/Chronos-Bot)

[Dugged](https://github.com/Robitobi01/robi_bot)

[Bismuth](https://github.com/landmining/Bismuth-bot)

[LiteTech](https://github.com/iDarkLightning/LiteBot)

## Contributing

Contributions are always welcome!

For commands, you can just make a pr, and we will review it.

For other major changes, please contact us on discord, so we can discuss it.


## License

[MIT](https://choosealicense.com/licenses/mit/)

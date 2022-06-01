import Discord, { Collection, ColorResolvable, Message } from "discord.js"

export interface help{
    name: string,
    alias?: string[],
    usage: string,
    example: string,
    desc: string,
    group: string,
    staffOnly: boolean,
    adminOnly: boolean,
    memberOnly: boolean,
    slash: string | boolean,
    options?: [
        {
            name: string,
            description: string,
            required: boolean,
            type: any
        }
    ]
}

export interface client extends Discord.Client{
    channels: any;
    commands?: Map<string, {help: help, run: Function, load: Function}>,
    config?: Config
}


export interface input {
    msg?: Discord.Message,
    interaction?: Discord.Interaction,
    args?: [string],
    client: Discord.Client
}

export interface input2 {
    channel: Discord.TextBasedChannels | null
    guild: Discord.Guild | null
    id: string 
    inguild: boolean
    isbutton?: boolean
    iscommand?: boolean
    member: Discord.GuildMember | any
    type: string
    user: Discord.User
    activity?: Discord.MessageActivity | null
    attachments?: Collection<string,Discord.MessageAttachment>
    content?: string
    createdAt: Date
    createdTimestamp: number
    delete?: ()=>  Promise<Message<boolean>>
    embeds?: Discord.MessageEmbed[]
    mentions?: Discord.MessageMentions
    react?: (emoji: Discord.EmojiIdentifierResolvable) => Promise<Discord.MessageReaction>
    msg?: Discord.Message,
    interaction?: Discord.Interaction,
    args?: [string],
    client: client,
    options?: Omit<Discord.CommandInteractionOptionResolver<Discord.CacheType>, "getMessage" | "getFocused">
}

export interface response{
    text?: string,
    emp?: boolean,
    dm?: boolean,
    embed?: Discord.MessageEmbed[]
}

export interface Server {
	name: string;
	url: string;
}

export interface Chatbridge {
	enabled: boolean;
    websocket_endpoint: string;
	channel: string;
	password: string;
}

export interface Status {
	enabled: boolean;
	text: string;
	type: string;
	url: string;
}

export interface Embed {
	color: ColorResolvable;
	footer: string;
}

export interface Config {
	botname: string;
	token: string;
	prefix: string;
	staff: string[];
	adminRole: string;
	memberRole: string;
	grinderRole: string;
	chatbridge: Chatbridge;
	status: Status;
	embed: Embed;
}
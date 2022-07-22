import Discord from "discord.js";
import { input2 } from "../../assets/Types";
import { fuzzy } from "../../assets/Connector";
module.exports = {
    run: async (input: input2) => {
        const user_input = input.content?.slice(input.content.indexOf(" ")).trim();
		let roles = input.guild?.roles.cache.clone();
        if (!roles || !user_input || user_input?.length < 1) {
        let exact_case = false;
            return;
        }
        let cached_roles = [];
        for (const [_, role] of roles) {
            cached_roles.push(role.name);
        }
        // because this ignores case, we must find the correct match instead
        const name = fuzzy(cached_roles, user_input, 0.8);
        let correct_name = "";
        let correct_id = "";
        for (const [_, role] of roles) {
            // exact match
            if (name == role.name) {
                correct_name = name;
                correct_id = role.id;
                break;
            }
            // mismatch case
            if (name == role.name.toLocaleLowerCase()) {
                correct_name = role.name;
                correct_id = role.id;
            }
        }
        if (correct_name.length == 0 || correct_id.length == 0) {
            // todo proper rejection message
            return;
        }
        console.log("asd" + input.guild?.roles.cache.get(correct_id)?.members.size);
        //(await input.guild?.members.fetch())?.map(m => m.roles.cache.get(correct_id))
        console.log("sad" + input.guild?.roles.cache.get(correct_id)?.members.size);
        const members = input.guild?.roles.cache.get(correct_id)?.members;
        if (!members) {
            // todo proper rejection message
            return;
        };
        let result = "";
        for (const [_, member] of members) {
            if (member.nickname) {
                result += `${member.user.username.replace("_", "\_")} (${member.nickname?.replace("_", "\_")}) ${member.id}\n`;
            } else {
                result += `${member.user.username.replace("_", "\_")} ${member.id}\n`;
            }
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(`Members with role: ${correct_name}`)
            .addField("list", result + ".")
        return { embeds: [embed] };
    },
    help: {
        name: "role",
        usage: "role rolename",
        example: "role friends",
        desc: "list all the users that have the role",
        group: "public",
        staffOnly: false,
        adminOnly: false,
        memberOnly: false,
        slash: "both",
        options: [],
    },
};


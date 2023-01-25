import Client from "@/Client";
import RR from "@/models/ReactionRole";
import RRG from "@/models/ReactionRoleGroup";
import { GuildMemberRoleManager, StringSelectMenuInteraction } from "discord.js";

export default async (client: Client, interaction: StringSelectMenuInteraction) => {
    if (!await RRG.exists({})) return console.log('no rrg');
    await interaction.deferUpdate();
    const add: string[] = [];
    const opts = interaction.component.options;
    for (const value of interaction.values) {
        const role = await RR.findById(parseInt(value.slice(-10)));
        if (!role) return;
        await add.push(value);
        if (!(interaction.member?.roles as GuildMemberRoleManager).cache.has(role.role)) {
            await (interaction.member?.roles as GuildMemberRoleManager).add(role.role, 'Automated Action: Reaction Roles');
        }
    };
    for (const opt of opts) {
        if (!add.includes(opt.value)) {
            const role = await RR.findById(parseInt(opt.value.slice(-10)));
            if (!role) return;
            if ((interaction.member?.roles as GuildMemberRoleManager).cache.has(role.role)) {
                await (interaction.member?.roles as GuildMemberRoleManager).remove(role.role, 'Automated Action: Reaction Roles');
            }
        };
    }
};

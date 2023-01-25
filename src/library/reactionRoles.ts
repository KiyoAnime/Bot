import Client from "@/Client";
import RR from "@/models/ReactionRole";
import RRG from "@/models/ReactionRoleGroup";
import { GuildMemberRoleManager, StringSelectMenuInteraction } from "discord.js";

export default async (client: Client, interaction: StringSelectMenuInteraction) => {
    if (!await RRG.exists({})) return;
    await interaction.deferUpdate();
    const opts = interaction.component.options;
    for (const opt of opts) {
        const role = await RR.findById(parseInt(opt.value.slice(-10)));
        if (!role) return;
        if (interaction.values.includes(opt.value)) {
            (interaction.member?.roles as GuildMemberRoleManager).add(role.role, 'Automated Action: Reaction Roles').catch(() => {});
        } else {
            (interaction.member?.roles as GuildMemberRoleManager).remove(role.role, 'Automated Action: Reaction Roles').catch(() => {});
        }
    };
};

import { CommandInteraction, GuildMember } from "discord.js";

export default async (interaction: CommandInteraction, member: any): Promise<GuildMember|undefined> => {
    if (member) {
        if (interaction.guild?.members.cache.has(member.id)) {
            return interaction.guild?.members.cache.get(member.id)!;
        } else interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    } else interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
};

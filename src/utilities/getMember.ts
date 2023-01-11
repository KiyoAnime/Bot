import { CommandInteraction, GuildMember } from "discord.js";

export default async (interaction: CommandInteraction, member: any): Promise<GuildMember> => {
    if (!member) await interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    if (!interaction.guild?.members.cache.has(member.id)) await interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    return interaction.guild?.members.cache.get(member.id)!;
};

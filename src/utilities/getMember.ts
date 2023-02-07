import { CommandInteraction, GuildMember, InteractionResponse } from 'discord.js';

export default async (interaction: CommandInteraction, member: any): Promise<GuildMember | undefined> => {
    if (member) {
        if (interaction.guild?.members.cache.has(member.id)) {
            return interaction.guild?.members.cache.get(member.id)!;
        }
    }
};

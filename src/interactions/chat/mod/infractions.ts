import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import permissions from "@/library/permissions";
import Infraction from "@/models/Infraction";
import dayjs from "dayjs";
import { EmbedBuilder } from "discord.js";

export const run: ChatCmdRun = async (client, interaction) => {
    switch (interaction.options.getSubcommand(true)) {
        case 'list':
            await interaction.deferReply();
            const lUserId = interaction.options.getString('user', true);
            const lInf = await Infraction.find({ user: lUserId });
            if (!lInf[0]) return interaction.editReply({ content: 'The specified user has no infractions.' });
            const lUser = await interaction.guild?.members.cache.get(lUserId);
            interaction.editReply({ embeds: [new EmbedBuilder({
                author: { name: `${lUser ? lUser.user.tag : lUserId} - Infractions`, icon_url: lUser?.displayAvatarURL({ forceStatic: true }) },
                color: client.config('brand.color'),
                description: lInf.map((i) => { return `**ID:** ${i._id} - **Type:** ${i.type} - **Mod:** ${interaction.guild?.members.cache.get(i.moderator) ? interaction.guild?.members.cache.get(i.moderator)?.user.tag : ''} (${i.moderator})` }).join('\n'),
                footer: { text: `${client.config('brand.name')} Moderation`, icon_url: client.user?.avatarURL()! },
                timestamp: Date.now()
            })] });
            break;

        case 'view':
            await interaction.deferReply();
            const vInf = await Infraction.findById(interaction.options.getInteger('id', true));
            if (!vInf) return interaction.editReply({ content: 'The specified infraction does not exist.' });
            const vUser = await interaction.guild?.members.cache.get(vInf.user);
            const vMod = await interaction.guild?.members.cache.get(vInf.moderator);
            interaction.editReply({ embeds: [new EmbedBuilder({
                title: `Infraction: ${vInf._id}`,
                color: client.config('brand.color'),
                description: `
                **User:** ${vUser ? `${vUser.user.tag} (${vInf.user})` : vInf.user }
                **Moderator:** ${vMod ? `${vMod.user.tag} (${vInf.moderator})`: vInf.moderator }`,
                fields: [
                    { name: 'Reason:', value: vInf.reason },
                    { name: 'Duration:', value: vInf.duration ? vInf.duration : 'N/A' },
                    { name: 'Issued On:', value: dayjs(vInf.createdAt).tz('Etc/UTC').format('MMMM Do, YYYY HH:mm (DD/MM/YY) (z)') } 
                ],
                footer: { text: `${client.config('brand.name')} Moderation`, icon_url: client.user?.avatarURL()! },
                timestamp: Date.now()
            })] });
            break;
    };
};

export const info: CommandInfo = {
    type: 1,
    name: 'inf',
    dm_permission: false,
    description: 'View or manage a users infractions.',
    default_member_permissions: permissions.moderateMembers,
    options: [
        {
            type: 1,
            name: 'list',
            description: 'View a users infractions.',
            options: [
                {
                    type: 3,
                    name: 'user',
                    required: true,
                    description: 'The ID of the user.'
                }
            ]
        },
        {
            type: 1,
            name: 'view',
            description: 'View a specific infraction.',
            options: [
                {
                    type: 4,
                    name: 'id',
                    required: true,
                    description: 'The ID of the infraction.'
                }
            ]
        },
        {
            type: 1,
            name: 'delete',
            description: 'Delete an infraction.',
            options: [
                {
                    type: 4,
                    name: 'id',
                    required: true,
                    description: 'The ID of the infraction.'
                }
            ]
        }
    ]
}

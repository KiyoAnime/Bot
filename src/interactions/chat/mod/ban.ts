import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import infraction from '@/library/infraction';
import permissions from '@/library/permissions';
import getMember from '@/utilities/getMember';
import ms from 'ms';

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member'));
    if (!member) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: 'I cannot moderate that member.' });
    const reason = interaction.options.getString('reason', true);
    const deleteMsg = interaction.options.getString('delete');
    await infraction(client, { type: 'BAN', user: member.user, reason: reason, moderator: interaction.user });
    await member.ban({ reason: `Moderator: ${interaction.user.tag} | Reason: ${reason}`, deleteMessageSeconds: deleteMsg ? ms(deleteMsg) / 1000 : undefined });
    interaction.reply({ content: `Successfully banned ${member.user.tag}.` });
};

export const info: CommandInfo = {
    type: 1,
    name: 'ban',
    dm_permission: false,
    description: 'Ban a member.',
    default_member_permissions: permissions.banMembers,
    options: [
        {
            type: 6,
            name: 'member',
            required: true,
            description: 'The member to ban.'
        },
        {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason for the ban.'
        },
        {
            type: 3,
            name: 'delete',
            required: false,
            description: 'Message history to delete.',
            choices: [
                { value: '1d', name: '1 Day' },
                { value: '3d', name: '3 Days' },
                { value: '7d', name: '7 Days' }
            ]
        }
    ]
};

import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import infraction from '@/library/infraction';
import permissions from '@/library/permissions';
import getMember from '@/utilities/getMember';

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member'));
    if (!member) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    const reason = interaction.options.getString('reason', true);
    await infraction(client, { type: 'WARN', user: member.user, reason: reason, moderator: interaction.user });
    interaction.reply({ content: `Successfully warned ${member.user.tag}.` });
};

export const info: CommandInfo = {
    type: 1,
    name: 'warn',
    dm_permission: false,
    description: 'Warn a member.',
    default_member_permissions: permissions.manageMessages,
    options: [
        {
            type: 6,
            name: 'member',
            required: true,
            description: 'The member to warn.'
        },
        {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason for the warn.'
        }
    ]
};

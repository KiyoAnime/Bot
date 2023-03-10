import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import infraction from '@/library/infraction';
import permissions from '@/library/permissions';
import getMember from '@/utilities/getMember';
import { PermissionsBitField } from 'discord.js';
import ms from 'ms';

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member'));
    if (!member) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    if (!member.moderatable) return interaction.reply({ content: 'I cannot moderate that member.' });
    if (
        member.permissions.has(PermissionsBitField.Flags.ModerateMembers) &&
        !(interaction.member?.permissions as Readonly<PermissionsBitField>).has(PermissionsBitField.Flags.Administrator)
    ) return interaction.reply({ content: 'You do not have permission to timeout this member.' });
    const length = interaction.options.getString('length', true);
    const reason = interaction.options.getString('reason', true);
    await infraction(client, { type: 'TIMEOUT', user: member.user, reason: reason, moderator: interaction.user, duration: ms(ms(length), { long: true }) });
    await member.timeout(ms(length!), `Moderator: ${interaction.user.tag} | Reason: ${reason}`);
    interaction.reply({ content: `Successfully timed-out ${member.user.tag} for ${ms(ms(length), { long: true })}.` });
};

export const info: CommandInfo = {
    type: 1,
    name: 'timeout',
    dm_permission: false,
    description: 'Timeout a member.',
    default_member_permissions: permissions.moderateMembers,
    options: [
        {
            type: 6,
            name: 'member',
            required: true,
            description: 'The member to timeout.'
        },
        {
            type: 3,
            name: 'length',
            required: true,
            description: 'Duration of the timeout.',
            choices: [
                { value: '15m', name: '15 Minutes' },
                { value: '30m', name: '30 Minutes' },
                { value: '1h', name: '1 Hour' },
                { value: '3h', name: '3 Hours' },
                { value: '6h', name: '6 Hours' },
                { value: '12h', name: '12 Hours' },
                { value: '1d', name: '1 Day' },
                { value: '3d', name: '3 Days' },
                { value: '7d', name: '7 Days' }
            ]
        },
        {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason for the timeout.'
        }
    ]
};

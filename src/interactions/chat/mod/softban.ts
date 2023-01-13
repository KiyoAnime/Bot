import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import permissions from "@/library/permissions";
import getMember from "@/utilities/getMember";
import ms from "ms";

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member'));
    if (!member) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: 'I cannot moderate that member.' });
    const reason = interaction.options.getString('reason');
    const deleteMsg = interaction.options.getString('delete');
    await member.ban({ reason: `(Soft Ban) Moderator: ${interaction.user.tag} | Reason: ${reason}`, deleteMessageSeconds: ms(deleteMsg!) / 1000 });
    await interaction.guild?.members.unban(member.id, `(Soft Ban) Moderator: ${interaction.user.tag} | Reason: ${reason}`);
    interaction.reply({ content: `Successfully soft-banned ${member.user.tag}.` });
};

export const info: CommandInfo = {
    type: 1,
    name: 'softban',
    dm_permission: false,
    description: 'Softban a member.',
    default_member_permissions: permissions.banMembers,
    options: [
        {
            type: 6,
            name: 'member',
            required: true,
            description: 'The member to softban.'
        },
        {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason for the softban.'
        },
        {
            type: 3,
            name: 'delete',
            required: true,
            description: 'Message history to delete.',
            choices: [
                { value: '1d', name: '1 Day' },
                { value: '3d', name: '3 Days' },
                { value: '7d', name: '7 Days' }
            ]
        }
    ]
};

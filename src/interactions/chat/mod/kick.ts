import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import permissions from "@/library/permissions";
import getMember from "@/utilities/getMember";

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member'));
    if (!member) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    if (!member.kickable) return interaction.reply({ content: 'I cannot moderate that member.' });
    const reason = interaction.options.getString('reason');
    await member.kick(`Moderator: ${interaction.user.tag} | Reason: ${reason}`);
    interaction.reply({ content: `Successfully kicked ${member.user.tag}.` });
};

export const info: CommandInfo = {
    type: 1,
    name: 'kick',
    dm_permission: false,
    description: 'Kick a member.',
    default_member_permissions: permissions.kickMembers,
    options: [
        {
            type: 6,
            name: 'member',
            required: true,
            description: 'The member to kick.'
        },
        {
            type: 3,
            name: 'reason',
            required: true,
            description: 'Reason for the kick.'
        }
    ]
};

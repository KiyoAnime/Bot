import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import getMember from '@/utilities/getMember';

export const run: ChatCmdRun = async (client, interaction) => {
	const user = await getMember(interaction, interaction.options.getMember('member') || interaction.member);
	if (!user) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
	interaction.reply({ content: user.displayAvatarURL({ size: 512 }) });
};

export const info: CommandInfo = {
    type: 1,
	name: 'avatar',
	dm_permission: false,
	description: 'Get a members avatar.',
	options: [
		{
			type: 6,
			name: 'member',
            required: false,
			description: 'The member to get avatar for.'
		}
	]
};

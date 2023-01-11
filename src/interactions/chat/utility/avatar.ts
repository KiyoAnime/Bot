import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import getMember from '@/utilities/getMember';

export const run: ChatCmdRun = async (client, interaction) => {
	const user = await getMember(interaction, interaction.options.getMember('member') || interaction.member);
	await interaction.reply({ content: user.displayAvatarURL({ size: 512 }) });
};

export const info: CommandInfo = {
    type: 1,
	name: 'avatar',
	description: 'Get a members avatar.',
	dm_permission: false,
	options: [
		{
			type: 6,
			name: 'member',
            required: true,
			description: 'The member to get avatar for.'
		}
	]
};
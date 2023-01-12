import { ChatCmdRun, CommandInfo } from "@/Interfaces";

export const run: ChatCmdRun = (client, interaction) => {
	const result = Math.floor(Math.random() * 2) + 1;
	let msg: string = '';
	switch (result) {
		case 1:
			msg = 'Heads!';
			break;

		case 2:
			msg = 'Tails!';
			break;
	}
	interaction.reply({ content: msg });
};

export const info: CommandInfo = {
    type: 1,
	name: 'flip',
	description: 'Flip a coin.',
	dm_permission: true
};

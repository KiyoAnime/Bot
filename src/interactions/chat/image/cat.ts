import { CommandInfo, ChatCmdRun } from '@/Interfaces';
import axios from 'axios';
import { AttachmentBuilder } from 'discord.js';

export const run: ChatCmdRun = async (client, interaction) => {
	const image = await axios.get('https://api.thecatapi.com/v1/images/search');
	const attachment = new AttachmentBuilder(image.data[0].url, { name: 'cat.jpg' });
	await interaction.reply({ files: [attachment] });
};

export const info: CommandInfo = {
    type: 1,
	name: 'cat',
	description: 'Get a random cat image.',
	dm_permission: true
};

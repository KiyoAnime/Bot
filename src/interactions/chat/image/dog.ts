import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import axios from 'axios';
import { AttachmentBuilder } from 'discord.js';

export const run: ChatCmdRun = async (client, interaction) => {
    const image = await axios.get('https://api.thedogapi.com/v1/images/search');
    const attachment = new AttachmentBuilder(image.data[0].url, { name: 'dog.jpg' });
    await interaction.reply({ files: [attachment] });
};

export const info: CommandInfo = {
    type: 1,
    name: 'dog',
    dm_permission: true,
    description: 'Get a random dog image.'
};

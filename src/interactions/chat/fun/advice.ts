import { CommandInfo, ChatCmdRun } from '@/Interfaces';
import axios from 'axios';

export const run: ChatCmdRun = async (client, interaction) => {
    const res = await axios.get('https://api.adviceslip.com/advice');
    await interaction.reply({ content: res.data.slip.advice });
};

export const info: CommandInfo = {
    type: 1,
    name: 'advice',
    dm_permission: true,
    description: 'Get a random slip of advice.'
};

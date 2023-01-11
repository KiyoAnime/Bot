import { CommandInfo, ChatCmdRun } from "@/Interfaces";
import axios from "axios";

export const run: ChatCmdRun = async (client, interaction) => {
    const res = await axios.get('https://zenquotes.io/api/quotes');
    await interaction.reply({ content: `\"${res.data[0].q}\" - ${res.data[0].a}` });
};

export const info: CommandInfo = {
    type: 1,
    name: 'quote',
    dm_permission: true,
    description: 'Get a random quote.'
};

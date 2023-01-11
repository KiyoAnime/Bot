import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const run: ChatCmdRun = async (client, interaction) => {
    const category = interaction.options.getString('category');
    const res = await axios.get(`https://v2.jokeapi.dev/joke/${category ? category : 'Miscellaneous'}?blacklistFlags=religious,racist,sexist`);
    const categoryName = (res.data.category as string).replace('Misc', 'Random');

    if (res.data.type === 'twopart') {
        const embed = new EmbedBuilder({
            title: `${categoryName} Joke`,
            color: client.config('brand.color'),
            description: `${res.data.setup}\n\n${res.data.delivery}`,
            footer: { text: `${client.config('brand.name')} Fun`, icon_url: client.user?.avatarURL()! },
            timestamp: Date.now()
        });
        await interaction.reply({ embeds: [embed] });
    } else {
        const embed = new EmbedBuilder({
            title: `${categoryName} Joke`,
            description: res.data.joke,
            color: client.config('brand.color'),
            footer: { text: `${client.config('brand.name')} Fun`, icon_url: client.user?.avatarURL()! },
            timestamp: Date.now()
        });
        await interaction.reply({ embeds: [embed] });
    };
};

export const info: CommandInfo = {
    type: 1,
    name: 'joke',
    dm_permission: true,
    description: 'Get a random joke.',
    options: [
        {
            type: 3,
            required: false,
            name: 'category',
            description: 'Type of joke.',
            choices: [
                {
                    name: 'Developer',
                    value: 'Programming'
                },
                {
                    name: 'Dark',
                    value: 'Dark'
                },
                {
                    name: 'Pun',
                    value: 'Pun'
                }
            ]
        }
    ]
};

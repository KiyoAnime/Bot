import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import getMember from '@/utilities/getMember';
import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member'));
    if (!member) return interaction.reply({ content: 'Invalid member specified.', ephemeral: true });
    const img = await axios.get('https://nekos.life/api/v2/img/cuddle');
    const embed = new EmbedBuilder({
        title: `${interaction.user.username} cuddles ${member.user.username}!`,
        color: client.config('brand.color'),
        image: { url: img.data.url },
        footer: { text: `${client.config('brand.name')} Fun`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
    type: 1,
    name: 'cuddle',
    dm_permission: false,
    description: 'Give someone a nice cuddle.',
    options: [
        {
            type: 6,
            name: 'member',
            required: true,
            description: 'The member to cuddle.'
        }
    ]
};

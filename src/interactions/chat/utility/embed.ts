import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import rawEmbeds from '@/library/embeds';
import permissions from '@/library/permissions';
import { EmbedBuilder, TextChannel } from 'discord.js';

export const run: ChatCmdRun = (client, interaction) => {
    const channel = interaction.options.getChannel('channel') as TextChannel;
    const id = interaction.options.getString('id')!;
    const embeds = rawEmbeds(client, interaction);
    const rawEmbed = embeds[id];
    if (!rawEmbed) return interaction.reply({ content: 'Invalid embed specified.', ephemeral: true });
    const embed = new EmbedBuilder(rawEmbed);
    channel.send({ embeds: [embed] });
    interaction.reply({ content: 'Successfully sent embed.' });
};

export const info: CommandInfo = {
    type: 1,
    name: 'embed',
    dm_permission: false,
    default_member_permissions: permissions.administrator,
    description: 'Send a pre-generated embed to the specified channel.',
    options: [
        {
            type: 7,
            required: true,
            name: 'channel',
            description: 'The channel to send the embed to.'
        },
        {
            type: 3,
            name: 'id',
            required: true,
            description: 'The id of the embed you wish to send.'
        }
    ]
};

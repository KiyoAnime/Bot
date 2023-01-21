import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import permissions from "@/library/permissions";
import { ChannelType, PermissionsBitField, TextChannel, ThreadChannel } from "discord.js";

export const run: ChatCmdRun = async (client, interaction) => {
    const message = interaction.options.getString('message')!;
    const channel = interaction.options.getChannel('channel')!;
    const types = [ChannelType.GuildText, ChannelType.PublicThread, ChannelType.PrivateThread];
    if (!types.includes(channel.type)) return interaction.reply({ content: `Invalid channel type. I cannot speak in that channel. I can only speak in text channels.`, ephemeral: true });
    const newChannel = channel as TextChannel|ThreadChannel;
    if (!newChannel.permissionsFor(interaction.guild?.members.me!).has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: 'I do not have permission to speak in this channel. I can only speak in public channels.', ephemeral: true });
    await newChannel.send({ content: message });
    interaction.reply({ content: 'Successfully sent message.' });
};

export const info: CommandInfo = {
    type: 1,
    name: 'say',
    dm_permission: false,
    description: 'Make Kiyo Chan say something.',
    default_member_permissions: permissions.manageMessages,
    options: [
        {
            type: 7,
            required: true,
            name: 'channel',
            description: 'The channel to send the message to.'
        },
        {
            type: 3,
            required: true,
            name: 'message',
            description: 'The channel to send the message to.'
        }
    ]
};

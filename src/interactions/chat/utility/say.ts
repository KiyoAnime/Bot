import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import permissions from "@/library/permissions";
import { TextChannel } from "discord.js";

export const run: ChatCmdRun = async (client, interaction) => {
    const message = interaction.options.getString('message')!;
    const channel = interaction.options.getChannel('channel') as TextChannel;
    await channel.send({ content: message });
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

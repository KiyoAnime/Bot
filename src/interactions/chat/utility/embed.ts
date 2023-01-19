import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import embedsRaw from "@/library/embeds";
import permissions from "@/library/permissions";
import { EmbedBuilder, TextChannel } from "discord.js";

export const run: ChatCmdRun = (client, interaction) => {
    const channel = interaction.options.getChannel('channel') as TextChannel;
    const id = interaction.options.getString('id')!;
    const embeds = embedsRaw(client, interaction);
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
}

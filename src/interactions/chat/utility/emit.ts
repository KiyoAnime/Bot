import { ChatCmdRun, CommandInfo } from '@/Interfaces';
import permissions from '@/library/permissions';

export const run: ChatCmdRun = async (client, interaction) => {
    if (interaction.user.id !== '762931157498331157') return interaction.reply({ content: 'This is a developer only command.', ephemeral: true });
    await client.emit(interaction.options.getString('event')!, interaction.member);
    interaction.reply({ content: 'Successfully emmited event.' });
};

export const info: CommandInfo = {
    type: 1,
    name: 'emit',
    dm_permission: false,
    description: 'Emit a guild event to the client.',
    default_member_permissions: permissions.administrator,
    options: [
        {
            type: 3,
            name: 'event',
            required: true,
            description: 'The event to emit.'
        }
    ]
};

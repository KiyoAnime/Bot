import { CommandInfo, UserCmdRun } from '@/Interfaces';

export const run: UserCmdRun = (client, interaction) => {
    const avatar = interaction.targetUser.displayAvatarURL({ size: 512 });
    interaction.reply({ content: avatar });
};

export const info: CommandInfo = {
    type: 2,
    name: 'Avatar',
    dm_permission: false
};

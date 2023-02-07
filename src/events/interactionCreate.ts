import Client from '@/Client';
import { Interaction } from 'discord.js';
import chatInput from './interactions/chatInput';
import stringSelect from './interactions/stringSelect';
import userContext from './interactions/userContext';

export default (client: Client, interaction: Interaction) => {
    if (interaction.isChatInputCommand()) chatInput(client, interaction);
    if (interaction.isStringSelectMenu()) stringSelect(client, interaction);
    if (interaction.isUserContextMenuCommand()) userContext(client, interaction);
};

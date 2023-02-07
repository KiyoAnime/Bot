import Client from '@/Client';
import { ActivityType } from 'discord.js';
import { grey as g, magentaBright as m } from 'chalk';

export default (client: Client) => {
    console.log(`${g.bold('[')}${m.bold('CLIENT')}${g.bold(']')} Successfully logged into Discord as ${client.user?.tag}`);
    client.user?.setPresence({ status: 'idle', activities: [{ type: ActivityType.Watching, name: 'Kiyo Development' }] });
};

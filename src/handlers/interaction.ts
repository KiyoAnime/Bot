import Client from '@/Client';
import Command from '@/interfaces/Command';
import { readdirSync } from 'fs';
import { grey as gr, green as g } from 'chalk';

export default (client: Client) => {
    const path = `${__dirname}/../interactions`;
    const types = readdirSync(path);
    for (const type of types) {
        const categories = readdirSync(`${path}/${type}`);
        for (const category of categories) {
            const commands = readdirSync(`${path}/${type}/${category}`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            for (const command of commands) {
                const cmd: Command = require(`${path}/${type}/${category}/${command}`);
                client.commands.set(cmd.info.name, cmd);
            }
        }
    }
    console.log(`${gr.bold('[')}${g.bold('HANDLER')}${gr.bold(']')} All interactions have successfully loaded.`);
};

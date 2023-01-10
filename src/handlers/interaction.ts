import Client from "@/Client";
import Command from "@/interfaces/Command";
import { readdirSync } from "fs";

export default (client: Client) => {
    const path = `${__dirname}/../commands`;
    const types = readdirSync(path);
    for (const type of types) {
        const categories = readdirSync(`${path}/${type}`);
        for (const category of categories) {
            const commands = readdirSync(`${path}/${type}/${category}`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
            for (const command of commands) {
                const cmd: Command = require(`${path}/${type}/${category}/${command}`);
                client.commands.set(cmd.info.name, cmd);
            };
        };
    };
    console.log('All interactions loaded.');
};

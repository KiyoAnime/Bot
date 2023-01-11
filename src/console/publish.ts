import dayjs from "@/helpers/dayjs";
import { Command, CommandInfo } from "@/Interfaces";
import axios from "axios";
import { readdirSync } from "node:fs";
import config from 'config';

console.clear();
dayjs();

const commandData: CommandInfo[] = Array();
const path = `${__dirname}/../interactions`;
const types = readdirSync(path);

for (const type of types) {
    const categories = readdirSync(`${path}/${type}`);
    for (const category of categories) {
        const commands = readdirSync(`${path}/${type}/${category}`).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        for (const command of commands) {
            const { info }: Command = require(`${path}/${type}/${category}/${command}`);
            commandData.push(info);
        };
    };
};

axios({
    method: 'PUT',
    url: `https://discord.com/api/v10/applications/${config.get('client.id')}/guilds/${config.get('guild')}/commands`,
    data: commandData,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${process.env.BOT_TOKEN}`
    }
}).then((res) => {
    if (res.status === 200) {
        return console.log('Successfully published all application commands.')
    } else {
        return console.log('An unexpected error has occured.');
    };
}).catch((err) => {
    console.log('An unexpected error has occured.');
    return console.log(err);
});

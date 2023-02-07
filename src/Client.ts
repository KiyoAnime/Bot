import { Client as DiscordClient, Collection } from 'discord.js';
import Command from '@/interfaces/Command';
import config from 'config';

export default class Client extends DiscordClient {
    public commands = new Collection<string, Command>();

    public config = (key: string): any => {
        return config.get(key);
    };
}

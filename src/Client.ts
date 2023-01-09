import { Client as DiscordClient, Collection } from 'discord.js';
import Command from '@/interfaces/Command';

export default class Client extends DiscordClient {
    public commands = new Collection<string, Command>();
};

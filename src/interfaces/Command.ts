import Client from '@/Client';
import { ChatInputCommandInteraction, CommandInteraction, UserContextMenuCommandInteraction } from 'discord.js';

export default interface Command {
    info: CommandInfo;
    run: CmdRun;
}

export interface CommandInfo {
    type: 1|2|3;
    name: string;
    options?: Options[];
    description?: string;
    dm_permission: boolean;
    default_member_permissions?: number;
}

type Options = {
    type: 1|2;
    name: string;
    required?: boolean;
    choices?: Choice[];
    min_value?: number;
    max_value?: number;
    options?: Options[];
    description: string;
    channel_types?: ChannelType[];
} | {
    name: string;
    required: boolean;
    choices?: Choice[];
    min_value?: number;
    max_value?: number;
    options?: Options[];
    description: string;
    channel_types?: ChannelType[];
    type: 1|2|3|4|5|6|7|8|9|10|11;
}

interface Choice {
    name: string;
    value: string|number;
}

type ChannelType = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15;

interface CmdRun {
    (client: Client, interaction: CommandInteraction): void;
}

export interface ChatCmdRun {
    (client: Client, interaction: ChatInputCommandInteraction): void;
}

export interface UserCmdRun {
    (client: Client, interaction: UserContextMenuCommandInteraction): void;
}

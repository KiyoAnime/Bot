import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import permissions from "@/library/permissions";
import { ApplicationCommandOptionType } from "discord.js";
import { groups } from "./reactionrole/groups";
import { roles } from "./reactionrole/roles";

export const run: ChatCmdRun = (client, interaction) => {
    const subcommands = interaction.options.data;
    for (const subcommand of subcommands) {
        if (subcommand.type !== ApplicationCommandOptionType.SubcommandGroup) roles(client, interaction); else groups(client, interaction);
    };
};

export const info: CommandInfo = {
    type: 1,
	name: 'rr',
    dm_permission: false,
	description: 'Manage reaction roles.',
	default_member_permissions: permissions.manageGuild,
	options: [
        {
			type: 1,
			name: 'list',
			description: 'List all reaction roles.'
		},
		{
			type: 1,
			name: 'view',
			description: 'View a reaction role.',
			options: [
				{
					type: 4,
					name: 'id',
                    required: true,
					description: 'The ID of the reaction role.'
				}
			]
		},
		{
			type: 1,
			name: 'create',
			description: 'Create a new reaction role.',
			options: [
				{
					type: 4,
					name: 'group',
                    required: true,
					description: 'The ID of the group for the reaction role.'
				},
				{
					type: 3,
					name: 'name',
                    required: true,
					description: 'The name of the reaction role.'
				},
				{
					type: 3,
                    required: true,
					name: 'description',
					description: 'The description of the reaction role.'
				},
				{
					type: 3,
					name: 'emoji',
					required: true,
					description: 'The emoji to display with the role.'
				},
				{
					type: 8,
					name: 'role',
                    required: true,
					description: 'The role to use for the reaction role.'
				}
			]
		},
		{
			type: 1,
			name: 'delete',
			description: 'Delete a reaction role.',
			options: [
				{
					type: 4,
					name: 'id',
                    required: true,
					description: 'The ID of the reaction role.'
				}
			]
		},
		{
			type: 1,
			name: 'output',
			description: 'Sends the reaction role embed.',
			options: [
                {
                    type: 7,
                    required: true,
                    name: 'channel',
                    description: 'The channel to send the embed to.'
                },
				{
					type: 4,
					name: 'group',
                    required: true,
					description: 'The ID of the group to send.'
				},
				{
					type: 5,
					required: true,
					name: 'multiple',
					description: 'If users should be able to select multiple roles.'
				}
			]
		},
		{
			type: 2,
			name: 'group',
			description: 'Manage reaction role groups.',
			options: [
                {
					type: 1,
					name: 'list',
					description: 'List all groups.'
				},
				{
					type: 1,
					name: 'view',
					description: 'View a group.',
					options: [
						{
							type: 4,
							name: 'id',
                            required: true,
							description: 'The ID of the group.'
						}
					]
				},
				{
					type: 1,
					name: 'create',
					description: 'Create a new group.',
					options: [
						{
							type: 3,
							name: 'name',
                            required: true,
							description: 'The name of the group.'
						},
						{
							type: 3,
                            required: true,
							name: 'description',
							description: 'The description of the group.'
						},
						{
							type: 3,
							name: 'color',
                            required: true,
							description: 'The color of the group (Hex).'
						},
                        {
							type: 3,
							name: 'image',
                            required: false,
							description: 'The image of the group (URL).'
						}
					]
				},
				{
					type: 1,
					name: 'delete',
					description: 'Delete a group.',
					options: [
						{
							type: 4,
							name: 'id',
                            required: true,
							description: 'The ID of the group.'
						}
					]
				}
			]
		}
	]
};

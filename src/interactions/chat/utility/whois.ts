import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import getMember from "@/utilities/getMember";
import dayjs from "dayjs";
import { ActivityType, ChatInputCommandInteraction, Collection, EmbedBuilder, GuildMember, PermissionsBitField, Presence, Role } from "discord.js";

export const run: ChatCmdRun = async (client, interaction) => {
    const member = await getMember(interaction, interaction.options.getMember('member') || interaction.member);
    const owner = member.user.id === interaction.guild?.ownerId;
    const data = {
        joined: dayjs(member.joinedTimestamp).tz('Etc/UTC').format('dddd, MMMM Do, YYYY HH:mm (DD/MM/YY) (z)'),
        created: dayjs(member.user.createdTimestamp).tz('Etc/UTC').format('dddd, MMMM Do, YYYY HH:mm (DD/MM/YY) (z)')
    };

    const embed = new EmbedBuilder({
        color: client.config('brand.color'),
        title: `User Info - ${member.user.tag} ${owner ? '(Server Owner)' : ''}`,
        thumbnail: { url: member.user.avatarURL()! },
        fields: [
            { name: 'ID:', value: member.user.id, inline: true },
            { name: 'Status:', value: getStatus(member.presence!), inline: true },
            { name: 'Activity:', value: getActivity(member.presence!), inline: true },
            { name: 'Nickname:', value: member.nickname ? member.nickname : 'None' },
            { name: 'Custom Status:', value: getCustomStatus(member.presence!), inline: true },
            { name: 'Roles:', value: getRoles(interaction, member.roles.cache).map((r) => {return `<@&${r.id}>`}).join(', '), inline: false },
            { name: 'Joined:', value: data.joined, inline: false },
            { name: 'Created:', value: data.created, inline: false },
            { name: 'Acknowledgements:', value: getAcknowledgements(member), inline: false }
        ],
        footer: { text: `${client.config('brand.name')} Utility`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
    type: 1,
    name: 'whois',
    dm_permission: false,
    description: 'Get a members information.',
    options: [
        {
            type: 6,
            name: 'member',
            required: false,
            description: 'The member to get information for.'
        }
    ]
};

interface CustomStatus {
    text: undefined|string;
    emoji: undefined|string;
}

const getRoles = (interaction: ChatInputCommandInteraction, roles: Collection<string, Role>): Collection<string, Role> => {
    roles.delete(interaction.guild!.roles.everyone.id);
    return roles.sort((r1, r2) => (r1.position !== r2.position ? r2.position - r1.position : parseInt(r1.id) - parseInt(r2.id)));
};

const getAcknowledgements = (member: GuildMember): string => {
    const acknowledgements: string[] = Array();
    if (member.user.id === member.guild.ownerId) acknowledgements.push('Server Owner');
    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) acknowledgements.push('Server Admin');
    if (member.permissions.has(PermissionsBitField.Flags.ManageGuild, false)) acknowledgements.push('Server Manager');
    if (member.permissions.has(PermissionsBitField.Flags.ModerateMembers, false)) acknowledgements.push('Server Moderator');
    return acknowledgements.length ? acknowledgements.join(', ') : 'None';
};

const getStatus = (presence: Presence): string => {
    if (!presence) return 'Offline / Invisible';
    const status: any = { online: 'Online / Active', idle: 'Idle / Away', dnd: 'Do Not Disturb / Busy', offline: 'Offline / Invisible' };
    const query = new RegExp(Object.keys(status).join('|'));
    return presence.status.replace(query, (matched) => {
        return status[matched];
    });
};

const getCustomStatus = (presence: Presence): string => {
    if (!presence) return 'Offline / Invisible';
    if (!presence.activities.length) return 'None';
    if (presence.activities[0].type !== ActivityType.Custom) return 'None';
    const activity = presence.activities[0];
    let data: CustomStatus = { text: undefined, emoji: undefined };
    if (activity.emoji && !activity.emoji.id) data.emoji = activity.emoji.name!;
    if (activity.state) data.text = activity.state;
    return `${data.emoji ? data.emoji : ''} ${data.text ? data.text : ''}`;
};

const getActivity = (presence: Presence): string => {
    if (!presence) return 'Offline / Invisible';
    const activities = [ActivityType.Playing, ActivityType.Listening, ActivityType.Streaming];
    const result = presence.activities.filter((a) => activities.includes(a.type))[0];
    if (!result) return 'None';
    switch (result.type) {
        case ActivityType.Playing:
            return `Playing ${result.name}`;
            break;

        case ActivityType.Listening:
            return 'Listening to Spotify';
            break;

        case ActivityType.Streaming:
            return `Streaming [${result.name}](${result.url})`;
            break;

        default:
            return 'None';
            break;
    };
};
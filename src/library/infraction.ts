import Client from "@/Client";
import Infraction from "@/models/Infraction";
import { genId } from "@/utilities/gen";
import { ColorResolvable, EmbedBuilder, resolveColor, TextChannel, User } from "discord.js";

interface Data {
    type: Type;
    user: User;
    reason: string;
    moderator: User;
    duration?: string;
}

type Type = 'BAN'|'WARN'|'KICK'|'TIMEOUT'|'SOFT-BAN';

export default async (client: Client, data: Data): Promise<number> => {
    const id = genId();
    const inf = await Infraction.create({
        _id: id,
        user: data.user.id,
        type: data.type,
        reason: data.reason,
        duration: data.duration,
        moderator: data.moderator.id
    });
    const guild = client.guilds.cache.get(client.config('guild'));
    const logsEmbed = new EmbedBuilder({
        author: { name: `Infraction | ${data.type.toLowerCase().charAt(0).toUpperCase() + data.type.toLowerCase().slice(1)} | ${inf._id}`, icon_url: data.user.displayAvatarURL({ forceStatic: true }) },
        color: resolveColor(getColor(data.type) as ColorResolvable),
        fields: [
            { name: 'User:', value: `<@!${data.user.id}> (${data.user.id})`, inline: true },
            { name: 'Moderator:', value: `<@!${data.moderator.id}> (${data.moderator.id})`, inline: true },
            { name: 'Reason:', value: data.reason, inline: false },
            { name: 'Duration:', value: `${data.duration ? data.duration : 'N/A'}`, inline: false }
        ],
        footer: { text: `${client.config('brand.name')} Moderation`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    const dmEmbed = new EmbedBuilder({
        title: `You have been ${getTitle(data.type)} in ${guild?.name}`,
        color: resolveColor(getColor(data.type) as ColorResolvable),
        thumbnail: { url: guild?.iconURL()! },
        description: `
        **ID:** ${inf._id}
        **Moderator:** ${data.moderator.tag} (${data.moderator.id})
        **Reason:** ${data.reason}
        ${data.duration ? `**Duration:** ${data.duration}` : ''}`,
        footer: { text: `${client.config('brand.name')} Moderation`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    await (client.channels.cache.get(client.config('channels.logs')) as TextChannel).send({ embeds: [logsEmbed] });
    await data.user.send({ embeds: [dmEmbed] }).catch(() => {});
    return inf._id;
};

function getColor(type: Type): string {
    const colors = { BAN: '#FA0F0F', WARN: '#D7FF24', KICK: '#FF7E14', TIMEOUT: '#FFB114', 'SOFT-BAN': '#FF7E14' };
    const regex = new RegExp(Object.keys(colors).join('|'), 'gi');
    return type.replace(regex, (matched) => {
        return colors[matched as Type];
    });
};

function getTitle(type: Type): string {
    const titles = { BAN: 'banned', WARN: 'warned', KICK: 'kicked', TIMEOUT: 'timed-out', 'SOFT-BAN': 'soft-banned' };
    const regex = new RegExp(Object.keys(titles).join('|'), 'gi');
    return type.replace(regex, (matched) => {
        return titles[matched as Type];
    })
};

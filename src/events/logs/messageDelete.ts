import Client from "@/Client";
import { EmbedBuilder, Message, PartialMessage, TextChannel } from "discord.js";

export default (client: Client, message: Message|PartialMessage) => {
    if (message.partial) return;
    if (message.embeds[0]) return;
    const embed = new EmbedBuilder({
        author: { name: 'Message Deleted', icon_url: message.member?.displayAvatarURL({ forceStatic: true }) },
        color: client.config('brand.color'),
        description: `**User:** ${message.member?.user.tag} (${message.member?.id}\n**Channel:** <#${message.channel.id}>`,
        fields: [
            { name: 'Content:', value: message.content }
        ],
        footer: { text: `${client.config('brand.name')} Logging`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    (client.channels.cache.get(client.config('channels.message')) as TextChannel).send({ embeds: [embed] });
};

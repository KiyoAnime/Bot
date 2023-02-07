import Client from '@/Client';
import getMessage from '@/utilities/getMessage';
import { EmbedBuilder, Message, PartialMessage, TextChannel } from 'discord.js';

export default (client: Client, oldMsg: Message | PartialMessage, newMsg: Message | PartialMessage) => {
    if (oldMsg.author?.bot) return;
    if (oldMsg.partial || newMsg.partial) return;
    if (oldMsg.embeds[0] || newMsg.embeds[0]) return;
    // prettier-ignore
    const embed = new EmbedBuilder({
        author: { name: 'Message Updated', icon_url: oldMsg.member?.displayAvatarURL({ forceStatic: true }) },
        color: client.config('brand.color'),
        description: `**User:** ${oldMsg.member?.user.tag} (${oldMsg.member?.id})\n**Channel:** <#${oldMsg.channel.id}> [Jump](${getMessage(oldMsg.guild?.id!, oldMsg.channel.id, newMsg.id)})`,
        fields: [
            { name: 'Old Message:', value: oldMsg.content },
            { name: 'New Message:', value: newMsg.content }
        ],
        footer: { text: `${client.config('brand.name')} Logging`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    (client.channels.cache.get(client.config('channels.message')) as TextChannel).send({ embeds: [embed] });
};

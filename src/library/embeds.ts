import { APIEmbed, ChatInputCommandInteraction, EmbedData } from "discord.js";
import Client from "@/Client";

interface Embed {
    [id: string]: APIEmbed|EmbedData;
}

export default (client: Client, interaction: ChatInputCommandInteraction): Embed => {
    return {
        rules1: {
            title: 'Rules - Kiyo Community',
            color: client.config('brand.color'),
            thumbnail: { url: interaction.guild?.iconURL()! },
            description: 'These are the official community rules for Kiyo. Make sure to give them a read!'
        },
        rules2: {
            title: 'General Rules',
            color: client.config('brand.color'),
            fields: [
                {
                    name: '',
                    value: ''
                }
            ]
        },
        rules3: {
            title: 'Voice Chat Rules',
            color: client.config('brand.color'),
            fields: [
                {
                    name: '',
                    value: ''
                }
            ]
        },
        rules4: {
            title: 'Discord Rules',
            color: client.config('brand.color'),
            description: 'Make sure to follow the ToS and Guidelines at all times.\n\nDiscord ToS: https://discord.com/terms\nDiscord Guidelines: https://discord.com/guidelines',
            footer: { text: `${client.config('brand.name')} Utility`, icon_url: client.user?.avatarURL()! },
            timestamp: Date.now()
        }
    }
};

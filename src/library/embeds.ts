import { APIEmbed, ChatInputCommandInteraction, EmbedData } from "discord.js";
import Client from "@/Client";

interface Embed {
    [id: string]: APIEmbed|EmbedData|undefined;
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
                    name: '(1) No hate speech or any sexist, homophobic, or racist remarks.',
                    value: 'This includes the use of any racist remarks including racist slurs, this also includes the use of homophobic terms or slurs. This is a friendly server for all people, so no hate against LGBTQIA+ or any other groups.'
                },
                {
                    name: '(2) No drama of any kind including fights or harassment.',
                    value: 'This includes arguing with staff or another member over issues. Constructive criticism is okay. If you want to fight feel free to do it in DMS or a group chat. Do not harass other members in any circumstances. This also includes harassing members in their DMS.'
                },
                {
                    name: '(3) No NSFW or related content of any kind.',
                    value: 'This includes any links to NSFW sites. This also includes any gifs that represent an NSFW nature. This also includes sending NSFW-related messages. (Eg. Did you see the latest porno?) This also includes using NSFW-related terms in a conversation against another member (Eg. You are a dick, suck my dick bitch, etc.).'
                },
                {
                    name: '(4) Be respectful of **ALL** members and staff.',
                    value: 'It does not matter what rank a member holds, everyone is to be treated with respect. This goes both ways. This includes insulting people, degrading people, etc.'
                },
                {
                    name: '(5) No threats of any kind including jokes.',
                    value: 'This includes saying that you will take harmful action against someone as a joke or not. Threatening someone is a severe offense and will be treated as such.'
                },
                {
                    name: '(6) No doxing or threatening to dox under any circumstances.',
                    value: 'This includes releasing another user\'s personal information or threatening to. This is a severe offense and will be treated as such.'
                },
                {
                    name: '(7) Keep messages in their related channels.',
                    value: 'This includes sending any sort of message that has a separate channel in an unrelated channel. This also includes using commands in non-command channels.'
                },
                {
                    name: '(8) No chat flood or spamming of any kind.',
                    value: 'This includes sending large walls of text and sending many messages repeatedly. Bot channels are exempt from this rule.'
                },
                {
                    name: '(9) No self-promotion of any kind without approval.',
                    value: 'This includes sending links to social media profiles and guild invite links. This also includes no DM advertising. Do not DM users with unsolicited links or invites.'
                },
                {
                    name: '(10) No discussion of self-harm or related topics.',
                    value: 'This includes saying you will kill yourself, or telling others to kill themselves. If you are feeling like committing suicide or inflicting self-harm please contact your local suicide prevention hotline **ASAP**.'
                },
                {
                    name: '(11) Do not ping staff unless necessary.',
                    value: 'This includes pinging staff if someone is blatantly violating the rules of the server. If not necessary staff should not be pinged unless they have given explicit permission to be pinged.'
                },
                {
                    name: '(12) Staff decisions are final. So please treat them as so.',
                    value: 'Ban appeals will be available at a later date through our website or email.'
                }
            ]
        },
        rules3: {
            title: 'Voice Chat Rules',
            color: client.config('brand.color'),
            fields: [
                {
                    name: '(1) Do not annoy other users by making loud or disruptive sounds. (Eg. Blowing into the mic, screaming into the mic.)',
                    value: ''
                },
                {
                    name: '(2) Do not stream or discuss any NSFW or related material.',
                    value: ''
                },
                {
                    name: '(3) Do not flirt with other users. This is a community server for everyone. Please keep that stuff in DMS.',
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

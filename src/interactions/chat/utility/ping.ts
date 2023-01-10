import { ChatCmdRun, CommandInfo } from "@/Interfaces";
import { EmbedBuilder } from "discord.js";

export const run: ChatCmdRun = async (client, interaction) => {
    const appPing = Date.now() - interaction.createdTimestamp;
    const embed = new EmbedBuilder({
        title: '🏓 Bot Ping',
        color: client.config('brand.color'),
        description: `⌛ App: ${appPing}ms\n💓 WS: ${client.ws.ping}ms\n⚙ Gen: ${(appPing + client.ws.ping) / 2}ms`,
        footer: { text: `${client.config('brand.name')} Utility`, icon_url: client.user?.avatarURL()! },
        timestamp: Date.now()
    });
    await interaction.reply({ embeds: [embed] });
};

export const info: CommandInfo = {
    type: 1,
    name: 'ping',
    description: 'Ping pong 🏓',
    dm_permission: true
};
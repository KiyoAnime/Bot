import Client from "@/Client";
import { ChatInputCommandInteraction } from "discord.js";

export default (client: Client, interaction: ChatInputCommandInteraction) => {
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd || cmd.info.type !== 1) return;
    return cmd.run(client, interaction);
};

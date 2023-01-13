import Client from "@/Client";
import { UserContextMenuCommandInteraction } from "discord.js";

export default (client: Client, interaction: UserContextMenuCommandInteraction) => {
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd || cmd.info.type !== 2) return;
    return cmd.run(client, interaction);
};

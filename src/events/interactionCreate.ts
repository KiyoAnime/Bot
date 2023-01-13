import Client from "@/Client";
import { Interaction } from "discord.js";
import chatInput from "./interactions/chatInput";
import userContext from "./interactions/userContext";

export default (client: Client, interaction: Interaction) => {
    if (interaction.isChatInputCommand()) chatInput(client, interaction);
    if (interaction.isUserContextMenuCommand()) userContext(client, interaction);
};

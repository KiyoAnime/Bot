import Client from "@/Client";
import { Interaction } from "discord.js";
import chatInput from "./interactions/chatInput";

export default (client: Client, interaction: Interaction) => {
    if (interaction.isChatInputCommand()) chatInput(client, interaction);
};

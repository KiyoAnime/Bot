import Client from "@/Client";
import reactionRoles from "@/library/reactionRoles";
import { StringSelectMenuInteraction } from "discord.js";

export default (client: Client, interaction: StringSelectMenuInteraction) => {
    reactionRoles(client, interaction);
};

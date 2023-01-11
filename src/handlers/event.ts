import Client from "@/Client";
import clientReady from "@/events/clientReady";
import guildMemberAdd from "@/events/guildMemberAdd";
import interactionCreate from "@/events/interactionCreate";
import { Events } from "discord.js";

export default (client: Client) => {
    client.on(Events.ClientReady, () => clientReady(client));
    client.on(Events.GuildMemberAdd, (member) => guildMemberAdd(client, member));
    client.on(Events.InteractionCreate, (interaction) => interactionCreate(client, interaction));
};

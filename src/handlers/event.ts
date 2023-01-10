import Client from "@/Client";
import clientReady from "@/events/clientReady";
import interactionCreate from "@/events/interactionCreate";
import { Events } from "discord.js";

export default (client: Client) => {
    client.on(Events.ClientReady, () => clientReady(client));
    client.on(Events.InteractionCreate, (interaction) => interactionCreate(client, interaction));
};

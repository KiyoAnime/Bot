import Client from "@/Client";
import clientReady from "@/events/clientReady";
import guildMemberAdd from "@/events/guildMemberAdd";
import interactionCreate from "@/events/interactionCreate";
import { Events } from "discord.js";
import { grey as gr, green as g } from 'chalk';

export default (client: Client) => {
    client.on(Events.ClientReady, () => clientReady(client));
    client.on(Events.GuildMemberAdd, (member) => guildMemberAdd(client, member));
    client.on(Events.InteractionCreate, (interaction) => interactionCreate(client, interaction));
    console.log(`${gr.bold('[')}${g.bold('HANDLER')}${gr.bold(']')} All events have successfully loaded.`);
};

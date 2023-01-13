import Client from "@/Client";
import { ActivityType } from "discord.js";

export default (client: Client) => {
    console.log('Client is ready');
    client.user?.setPresence({ status: 'idle', activities: [{ type: ActivityType.Watching, name: 'Kiyo Development' }] });
};

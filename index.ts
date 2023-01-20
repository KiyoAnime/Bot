import Client from "@/Client";
import event from "@/handlers/event";
import interaction from "@/handlers/interaction";
import helpers from "@/helpers";
import introduction from "@/library/introduction";
import { GatewayIntentBits, Options } from "discord.js";

introduction();

const client = new Client({
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        MessageManager: 180
    }),
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

helpers(client);
event(client);
interaction(client);

client.login(process.env.BOT_TOKEN);

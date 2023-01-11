import Client from "@/Client";
import event from "@/handlers/event";
import interaction from "@/handlers/interaction";
import helpers from "@/helpers";
import { GatewayIntentBits, Options } from "discord.js";

const client = new Client({
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        MessageManager: 180
    }),
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

event(client);
helpers(client);
interaction(client);

client.login(process.env.BOT_TOKEN);

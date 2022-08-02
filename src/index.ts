import fs from 'fs';
import { join } from 'path';
import db from './database/connection';
import { Client, Intents } from 'discord.js';
import server from './api/server';
import { intervalSetup } from './core/expirationCheck';
import config from './config';
import 'dotenv/config';

const TOKEN = process.env.TOKEN as string;

const client = new Client({
    partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

// Start point
(async () => {
    try {
        // Including all events
        let eventFiles = [];

        // Check if it is a production version
        __filename.endsWith('.ts')
            ? (eventFiles = fs
                  .readdirSync('./src/events')
                  .filter((file: string) => file.endsWith('.ts')))
            : (eventFiles = fs
                  .readdirSync('./build/events')
                  .filter((file: string) => file.endsWith('.js')));

        for (const file of eventFiles) {
            const event = (await import(join(__dirname, `./events/${file}`)))
                .default;

            if (event.once) {
                client.once(event.name, (...args) =>
                    event.execute(...args, client),
                );
            } else {
                client.on(event.name, (...args) =>
                    event.execute(...args, client),
                );
            }
        }

        // Connecting to the database & starting the bot
        await db;
        await client.login(TOKEN);

        // Check for expired keys every 24 hours
        intervalSetup(client);

        console.log('Dashbot online!');

        // Starting the server
        server(client);

        console.log(`Server online! Listening on port ${config.port}`);
    } catch (error) {
        console.error(new Date(), error);
        process.exit(1);
    }
})();

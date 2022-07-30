import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import fs from 'fs';

const commands: Function[] = [];
const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

(async () => {
    for (const file of commandFiles) {
        const command = (await import(`./commands/${file}`)).default;
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(
        process.env.TOKEN as string,
    );

    await rest.put(
        Routes.applicationCommands(process.env.APPLICATION_ID as string),
        { body: commands },
    );
})();

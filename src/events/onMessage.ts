import commandHandler from '../commands/handler';
import { Client, Message } from 'discord.js';

export default {
    name: 'messageCreate',
    execute(message: Message, client: Client) {
        commandHandler(message, client);
    },
};

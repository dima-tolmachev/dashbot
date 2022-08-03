import { Client, Message } from 'discord.js';
import help from './everyone/help';
import config from './admin/showConfig';
import show from './admin/showMember';
import freeze from './admin/freeze';
import unfreeze from './admin/unfreeze';
import date from './admin/date';
import stat from './admin/stat';
import details from './everyone/details';
import reset from './everyone/reset';
import collapse from './admin/collapse';

const commands: any = {
    help,
    config,
    show,
    freeze,
    unfreeze,
    date,
    stat,
    details,
    reset,
    collapse,
};

// Function that handles every single command from the discord text channel
const handler = (msg: Message, client: Client) => {
    var tokens = msg.content.split(' ');
    var command = tokens.shift();

    if (command && command.charAt(0) === '!') {
        command = command.substring(1);

        if (commands.hasOwnProperty(command)) {
            commands[command](msg, client);
        }
    }
};

export default handler;

import { Client, Message } from 'discord.js';
import config from './admin/showConfig';
import show from './admin/showMember';
import freeze from './admin/freeze';
import unfreeze from './admin/unfreeze';
import date from './admin/date';
import stat from './admin/stat';
import details from './everyone/details';
import reset from './everyone/reset';

const commands: any = {
    config,
    show,
    freeze,
    unfreeze,
    date,
    stat,
    details,
    reset,
};

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

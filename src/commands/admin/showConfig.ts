// Responses back with config setup
import { Message } from 'discord.js';
import config from '../../config';

const command = (msg: Message) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        msg.reply(`\`\`\`json\n${JSON.stringify(config)}\`\`\``);
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default command;

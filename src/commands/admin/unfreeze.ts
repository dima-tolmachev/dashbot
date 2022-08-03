// Unfreeze user's subscription
import { Message } from 'discord.js';
import User from '../../database/models/User';

const unfreeze = async (msg: Message) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        const message = msg.content.split(' ');
        if (message.length > 1) {
            let member = await User.findOneAndUpdate(
                { discordID: message[1] },
                { $set: { frozen: false } },
            );

            member
                ? msg.reply('This user will not be charged for the next period')
                : msg.reply('User not found in the database');
        } else {
            msg.reply('Invalid call, missing argument(s)');
        }
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default unfreeze;

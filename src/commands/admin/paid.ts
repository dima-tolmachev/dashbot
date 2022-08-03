// Freeze user's subscription
import { Message, TextChannel } from 'discord.js';
import User from '../../database/models/User';
import config from '../../config';

const paid = async (msg: Message) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        const message = msg.content.split(' ');
        if (message.length > 1) {
            if ((msg.channel as TextChannel).parent?.id === config.renewalCategoryID) {
                let member = await User.findOne({ discordID: message[1] });

                if (!member) {
                    msg.reply('User not found in the database');
                } else {
                    member.expires.setDate(
                        member.expires.getDate() + parseInt(message[2]),
                    );
                }
            }
        } else {
            msg.reply(
                'Invalid call, 2nd argument must be a number (for example: -10/2)',
            );
        }
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default paid;
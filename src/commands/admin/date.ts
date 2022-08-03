// Change user's next renewal date
import { Message } from 'discord.js';
import User from '../../database/models/User';

const date = async (msg: Message) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        const message = msg.content.split(' ');
        if (message.length > 2) {
            let member = await User.findOne({ discordID: message[1] });

            if (member) {
                let days = parseInt(message[2]);
                if (days !== NaN) {
                    member.expires.setDate(
                        member.expires.getDate() + parseInt(message[2]),
                    );

                    await User.updateOne({ discordID: message[1] }, member);

                    msg.reply(
                        `${parseInt(
                            message[2],
                        )} days to the user's subscription\nSubscription expires **${
                            member.expires
                        }**`,
                    );
                } else {
                    msg.reply(
                        'Invalid call, 2nd argument must be a number (for example: -10/2)',
                    );
                }
            } else msg.reply('User not found in the database');
        } else {
            msg.reply('Invalid call, missing argument(s)');
        }
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default date;

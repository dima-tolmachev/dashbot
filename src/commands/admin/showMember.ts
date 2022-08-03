// Responses back with member details
import { Message, MessageEmbed } from 'discord.js';
import User from '../../database/models/User';

const showMember = async (msg: Message) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        const message = msg.content.split(' ');

        if (message.length > 1) {
            const member = await User.findOne({ discordID: message[1] });

            if (member) {
                let answer = new MessageEmbed()
                    .setTitle('Member details')
                    .setDescription(`<@${msg.author.id}>`)
                    .addFields([
                        { name: 'discord ID', value: msg.author.id },
                        { name: 'username', value: msg.author.username },
                        {
                            name: 'license key',
                            value: member?.license || 'Not set',
                        },
                        {
                            name: 'expires',
                            value: member?.expires.toString() || '',
                        },
                        {
                            name: 'should pay for the next period',
                            value: member?.frozen ? 'No' : 'Yes',
                        },
                    ]);

                const avatarURL = msg.author.avatarURL();
                avatarURL ? answer.setThumbnail(avatarURL) : null;

                msg.reply({ embeds: [answer] });
            } else {
                msg.reply('You are not subscribed to the server');
            }
        } else {
            msg.reply('Invalid call, missing argument(s)');
        }
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default showMember;

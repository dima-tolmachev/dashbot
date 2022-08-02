import { Message, MessageEmbed } from 'discord.js';
import User from '../../database/models/User';

const command = async (msg: Message) => {
    const member = await User.findOne({ discordID: msg.author.id });

    if (member) {
        let answer = new MessageEmbed()
            .setTitle('Details of your subscription')
            .setDescription(`<@${msg.author.id}>`)
            .addFields([
                { name: 'discord ID', value: msg.author.id },
                { name: 'username', value: msg.author.username },
                { name: 'license key', value: member?.license || 'Not set' },
                { name: 'expires', value: member?.expires.toString() || '' },
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
};

export default command;

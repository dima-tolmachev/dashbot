import { Client, Message, MessageEmbed } from 'discord.js';
import User from '../../database/models/User';
import config from '../../config';
import { getGuild } from '../../utils/guildGetters';

const stat = async (msg: Message, client: Client) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        const guild = getGuild(client);

        const members = await User.find();

        let guildMembers = [];
        await guild?.members.fetch();
        if (guild?.members.cache.size) {
            guildMembers = Array.from(
                guild?.members.cache.filter((member) => {
                    return member.roles.cache.has(config.memberRoleID);
                }),
            );
        }

        const message = new MessageEmbed()
            .setTitle('Server statistics')
            .setDescription('Basic info about the server')
            .addFields([
                {
                    name: 'Total amount of subscribtions',
                    value: `${members ? members?.length : 0}`,
                },
                {
                    name: 'Total amount of subscribers (on the server now)',
                    value: `${guildMembers.length ? guildMembers.length : 0}`,
                },
                {
                    name: 'Total amount of members without subscription on the server',
                    value: `${
                        guild?.members.cache.size || 0 - guildMembers.length
                    }`,
                },
            ]);

        msg.reply({ embeds: [message] });
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default stat;

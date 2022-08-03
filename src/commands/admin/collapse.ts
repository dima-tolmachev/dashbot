// Delete all users from the database, and remove all their roles
import { Client, Message, MessageEmbed } from 'discord.js';
import User from '../../database/models/User';
import { getGuild } from '../../utils/guildGetters';
import config from '../../config';

const collapse = async (msg: Message, client: Client) => {
    if (msg.member?.permissions.has('ADMINISTRATOR')) {
        if (
            msg.content.startsWith('!collapse everything, I am sure about it')
        ) {
            const guild = getGuild(client);
            guild?.members.cache.forEach((member) => {
                member.roles.remove(config.memberRoleID);
            });

            await User.deleteMany({});
        } else {
            msg.reply(
                'If you are really want to destroy everything, type this: `!collapse everything, I am sure about it`',
            );
        }
    } else {
        msg.reply('You are not allowed to use this command.');
    }
};

export default collapse;

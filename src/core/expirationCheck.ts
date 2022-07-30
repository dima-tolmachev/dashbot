import { Client } from 'discord.js';
import User from '../database/models/User';
import { getGuild } from '../utils/guildGetters';
import config from '../config';
import {
    createPrivateChannel,
    findPrivateChannelByUser,
    removePrivateChannel,
} from './renewCategoryControl';

const dayInMilliseconds = 1000 * 60 * 60 * 24;

export const intervalSetup = (client: Client): void => {
    const startHour = config.licenseCheckTimePM;

    let startDate = new Date();
    startDate.setUTCHours(startHour, 0, 0, 0);

    let dif = startDate.getTime() - new Date().getTime();
    if (dif < 0) {
        dif = 24 * 60 * 60 * 1000 + dif;
    }

    setTimeout(() => {
        checkExpiredKeys(client);

        setInterval(() => {
            checkExpiredKeys(client);
        }, 24 * 60 * 60 * 1000);
    }, dif);
};

const checkExpiredKeys = (client: Client): void => {
    const guild = getGuild(client);
    guild?.members.cache.forEach(async (member) => {
        if (!member.user.bot && member.roles.cache.has(config.memberRoleID)) {
            const user = await User.findOne({ discordID: member.id });
            if (!user) return;

            const exp = new Date(user.expires);

            if (exp < new Date(Date.now() + dayInMilliseconds)) {
                const channel = await findPrivateChannelByUser(
                    member.id,
                    client,
                );
                channel && (await removePrivateChannel(channel.id, client));

                await member.kick('Subscription expired');
            } else if (exp < new Date(Date.now())) {
                const channel = await createPrivateChannel(member.id, client);
                channel && (await channel.send(config.renewalInstruction));
            }
        }
    });
};

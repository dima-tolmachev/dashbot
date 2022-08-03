import { Client, TextChannel } from 'discord.js';
import { getGuild, getMember } from '../utils/guildGetters';
import config from '../config';
import log from '../utils/log';

// Create a private channel for renewing the subscription
export const createPrivateChannel = async (
    memberID: string,
    client: Client,
): Promise<TextChannel | undefined> => {
    const guild = getGuild(client);
    const member = getMember(memberID, client);

    const everyoneRole = guild?.roles.everyone;
    const channelName =
        member?.user.username.replaceAll('#', '-') + ` [${memberID}]`;

    let channel = await guild?.channels.create(channelName, {
        parent: config.renewalCategoryID,
        permissionOverwrites: [
            {
                id: everyoneRole?.id || '',
                type: 'role',
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: memberID,
                type: 'member',
                allow: ['VIEW_CHANNEL'],
            },
        ],
    });

    if (channel) {
        channel = channel as TextChannel;
        await channel.send(`${config.renewalInstruction}\n<@${memberID}>`);
        log('Renewal channel created', memberID, config.colors.success, client);
    }

    return new Promise((resolve) => resolve(channel));
};

// Find the channel by the member's ID
export const findPrivateChannelByUser = async (
    memberID: string,
    client: Client,
): Promise<TextChannel | undefined> => {
    const channel = client.channels.cache.find((channel) => {
        return (channel as TextChannel)?.name.includes(memberID);
    });

    return new Promise((resolve) => resolve(channel as TextChannel));
};

// Remove a private-renewal channel from the server
export const removePrivateChannel = async (
    channelID: string,
    client: Client,
): Promise<boolean> => {
    const channel = getGuild(client)?.channels.cache.get(channelID);

    if (channel) {
        await channel.delete();
        return new Promise((resolve) => resolve(true));
    }

    return new Promise((resolve) => resolve(false));
};

import { Client, Guild, GuildMember, TextChannel } from 'discord.js';
import config from '../config';

export const getGuild = (client: Client): Guild | undefined => {
    return client.guilds.cache.get(config.guildID);
};

export const getLogsChannel = (client: Client): TextChannel | undefined => {
    const guild = getGuild(client);
    if (!guild) return undefined;

    return guild.channels.cache.get(config.logsChannelID) as TextChannel;
};

export const getMember = (
    userID: string,
    client: Client,
): GuildMember | undefined => {
    const guild = getGuild(client);
    if (!guild) return undefined;

    return guild.members.cache.get(userID);
};

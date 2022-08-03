import { Client, ColorResolvable, MessageEmbed } from 'discord.js';
import { getLogsChannel } from './guildGetters';

// Send logs to the logs channel
export default (
    action: string,
    memberID: string,
    color: string,
    client: Client,
) => {
    const channel = getLogsChannel(client);
    const msg = new MessageEmbed()
        .setTitle(action)
        .setDescription(`<@${memberID}>`)
        .setColor(color as ColorResolvable);

    channel?.send({ embeds: [msg] });
};

// Reset license key to use it on another device
import { Message } from 'discord.js';
import User from '../../database/models/User';

const reset = async (msg: Message) => {
    const member = await User.findOneAndUpdate(
        { discordID: msg.author.id },
        { $set: { IP: '', deviceID: '' } },
    );

    if (member) {
        msg.reply('Now you can use the key on another device');
    } else {
        msg.reply('You are not subscribed to the server');
    }
};

export default reset;

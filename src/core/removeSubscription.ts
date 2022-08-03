import { Client } from 'discord.js';
import { userObject } from '../@types/userObject';
import User from '../database/models/User';
import { removeRole } from '../utils/roleManagment';
import config from '../config';

// Safely remove a subscription from the server participant
const removeSubscription = async (
    discordID: string,
    client: Client,
): Promise<userObject | null> => {
    const user: userObject | null = await User.findOne({ discordID });

    if (!removeRole(discordID, config.memberRoleID, client))
        return new Promise((resolve) => resolve(null));

    if (user) await User.deleteOne({ discordID });

    return new Promise((resolve) => resolve(user));
};

export default removeSubscription;

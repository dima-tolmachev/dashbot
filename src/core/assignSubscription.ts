import { Client } from 'discord.js';
import { userObject } from '../@types/userObject';
import User from '../database/models/User';
import { getMember } from '../utils/guildGetters';
import { assignRole } from '../utils/roleManagment';
import config from '../config';
import generateLicenseKey from '../utils/generateLicenseKey';

// Safely assign a subscription to the server participant
const assignSubscription = async (
    discordID: string,
    client: Client,
): Promise<userObject | null> => {
    var user: userObject | null = await User.findOne({ discordID });

    if (!assignRole(discordID, config.memberRoleID, client))
        return new Promise((resolve) => resolve(null));

    if (!user) {
        const member = getMember(discordID, client);
        const roles = member?.roles.cache.map((role) => role.id) || [];
        const license = generateLicenseKey();
        const expires = new Date(Date.now() + config.licenseDuration);
        const freezed = config.freezedByDefault;

        user = { discordID, roles, license, expires, freezed };

        await User.insertMany([user]);
    }

    return new Promise((resolve) => resolve(user));
};

export default assignSubscription;

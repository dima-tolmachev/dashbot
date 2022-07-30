import { Client } from 'discord.js';
import { getMember } from './guildGetters';

// Safe role assignment function
export const assignRole = (
    userID: string,
    roleID: string,
    client: Client,
): boolean => {
    const member = getMember(userID, client);
    if (!member) return false;

    if (!member.roles.cache.has(roleID)) member.roles.add(roleID);

    return true;
};

// Safe role removal function
export const removeRole = (
    userID: string,
    roleID: string,
    client: Client,
): boolean => {
    const member = getMember(userID, client);
    if (!member) return false;

    if (member.roles.cache.has(roleID)) member.roles.remove(roleID);

    return true;
};

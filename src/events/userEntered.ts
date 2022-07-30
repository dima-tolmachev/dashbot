import { Client, GuildMember } from 'discord.js';
import User from '../database/models/User';
import { assignRole } from '../utils/roleManagment';

export default {
    name: 'guildMemberAdd',
    async execute(member: GuildMember, client: Client) {
        // Assigning every single role that has been saved in past
        const roles = (await User.findOne({ discordID: member.id }))?.roles;
        if (!roles) return;

        for (const role of roles) {
            assignRole(member.id, role, client);
        }
    },
};

import { Client, GuildMember } from 'discord.js';
import assignSubscription from '../core/assignSubscription';
import removeSubscription from '../core/removeSubscription';
import config from '../config';
import log from '../utils/log';

export default {
    name: 'guildMemberUpdate',
    async execute(
        oldMember: GuildMember,
        newMember: GuildMember,
        client: Client,
    ) {
        const memberRoleID = config.memberRoleID as string;
        const memberID = newMember.id;

        // User didn't have role and now has it
        if (
            !oldMember?.roles.cache.has(memberRoleID) &&
            newMember?.roles.cache.has(memberRoleID)
        ) {
            (await assignSubscription(memberID, client))
                ? log(
                      'Subscription assigned',
                      memberID,
                      config.colors.success,
                      client,
                  )
                : log(
                      'Subscription assignment failed',
                      memberID,
                      config.colors.error,
                      client,
                  );
        }

        // User had role and now doesn't have it anymore
        if (
            oldMember?.roles.cache.has(memberRoleID) &&
            !newMember?.roles.cache.has(memberRoleID)
        ) {
            await removeSubscription(memberID, client);
            log(
                'Subscription removed successfully',
                memberID,
                config.colors.success,
                client,
            );
        }
    },
};

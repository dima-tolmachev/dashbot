// Responses back with availiable commands list
import { Message } from 'discord.js';

const help = (msg: Message) => {
    msg.reply(`
\`\`\`
!config - Shows the current config on the server
!show [member id] - Shows member details*
!details - Shows the details of your subscription
!reset - Resets your license key
!date [member id] [+|-][days] - Adds or removes days from member's subscription*
!freeze [member id] - Freezes member's subscription*
!unfreeze [member id] - Unfreezes member's subscription*
!stat - Shows the stats of the server*
!collapse - Remove every single subscription on the database* 

* - available only for admins
\`\`\`
    `);
};

export default help;

// Responses back with config setup
import { CommandInteraction, GuildMember, Message } from 'discord.js';
import { CommandDS } from '../@types/command';
import { SlashCommandBuilder } from '@discordjs/builders';
import config from '../config';

const command: CommandDS = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Show the current config'),

    execute: async (interaction: CommandInteraction) => {
        //const member = interaction.member as GuildMember;
        await interaction.reply({ content: 'hello...', ephemeral: true });
        // if (member && member?.permissions.has('ADMINISTRATOR')) {
            // interaction.reply({ content: config.guildID, ephemeral: true });
        // }
    },
};

export default command;
import { ChocoBotCommand } from './types';
import { COMMANDS } from './index';
import { success, notify, embed } from '../utils/embeds';

import { COLORS } from '../constants';
import { CONFIG } from '../config';
import { ChocoEmbedField } from '@team-choco/core';
import { PositionalArgumentDetails } from '@team-choco/command-plugin';

export const help: ChocoBotCommand = (bot) => {
    bot.command('help', async ({ message }) => {
        const fields: ChocoEmbedField[] = [];

        bot.commands.forEach(element => fields.push({
            name: element.options.pattern.commandOnlyRegex.toString().replace(/[!@#$%^&*/]/g, '').slice(0, -1),
            value: arguements(element.options.pattern.args),
            inline: true
        }))
       
        return message.reply(success({
            title: `Help`,
            fields: fields
        }));
    })
}

function arguements(x: PositionalArgumentDetails[])
{
    if(x == undefined || x.length == 0)
        return 'none'
    
    const n = x.length
    const commands = []

    for(var i = 0; i < n; i++)
    {
        commands.push("<" + x[i].name + ">")
    }

    return commands.join(' ')
}
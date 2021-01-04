import { ChocoBotCommand } from './types';
import { COMMANDS } from './index';
import { success, notify, embed } from '../utils/embeds';

import { COLORS } from '../constants';
import { CONFIG } from '../config';
import { ChocoEmbedField } from '@team-choco/core';

export const help: ChocoBotCommand = (bot) => {
    bot.command('help', async ({ message }) => {
        // let commands:any[] = []
        // bot.commands.forEach(element => commands.push(element.options.pattern.commandOnlyRegex.toString().replace(/[!@#$%^&*/]/g, '').slice(0, -1)))
        // commands.forEach(element => console.log(element))

        const fields: ChocoEmbedField[] = [{
            name: "Usage",
            value: "Test",
            inline: true,
        }];

        bot.commands.forEach(element => fields.push({
            name: element.options.pattern.commandOnlyRegex.toString().replace(/[!@#$%^&*/]/g, '').slice(0, -1),
            value: 'Arguements',
            inline: true
        }))
       
        return message.reply(success({
            title: `Help`,
            fields: fields
        }));
    })

    // console.log("Length of bot.commands " + bot.commands.length)
    // console.log(JSON.stringify(bot.command))
    bot.commands.forEach(element => console.log(element.options.pattern.commandOnlyRegex.toString().replace(/[!@#$%^&*/]/g, '').slice(0, -1)))
    bot.commands.forEach(element => console.log(element.options.pattern.args))
    // console.log((bot.commands))
}
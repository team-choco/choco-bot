import { COLORS } from '../constants';
import { CONFIG } from '../config';

import { ChocoBotCommand } from './types';

export const info: ChocoBotCommand = (bot) => {
  bot.command('info', async ({ message }) => {
    const { id, username } = await bot.platform.info(true);

    await message.reply({
      embed: {
        color: COLORS.SUCCESS,
        title: {
          content: `Choco Bot (v${CONFIG.VERSION})`,
        },
        fields: [{
          name: 'ID',
          value: id,
          inline: true,
        }, {
          name: 'Name',
          value: username,
          inline: true,
        }],
      },
    });
  });
};

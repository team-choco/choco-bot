import { ChocoBotCore } from '@team-choco/core';
import { ChocoCommandPlugin } from '@team-choco/command-plugin';

import { CONFIG } from './config';
import { COLORS } from './constants';
import { getPlatform } from './platform';

const bot = new ChocoBotCore({
  platform: getPlatform(CONFIG.PLATFORM),

  plugins: [
    new ChocoCommandPlugin({
      prefix: '!',
    }),
  ],
});

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

bot.on('ready', async () => {
  console.log('Kweh! Choco Bot is now up and running!');

  await bot.platform.status('online', `Use !help`);
});

process.on('SIGINT', async () => {
  console.log('Updating status...');
  await bot.platform.status('invisible', 'Use !help');

  console.log('Destroying bot...');
  await bot.destroy();

  process.exit(0);
});

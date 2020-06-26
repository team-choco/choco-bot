import { ChocoBotCore } from '@team-choco/core';
import { ChocoShellPlatform } from '@team-choco/shell-platform';
import { ChocoCommandPlugin } from '@team-choco/command-plugin';

const bot = new ChocoBotCore({
  platform: new ChocoShellPlatform({
    name: 'Choco Bot',
  }),

  plugins: [
    new ChocoCommandPlugin({
      prefix: '!',
    }),
  ],
});

bot.command('ping', async ({ message }) => {
  await message.reply('pong!');
});

bot.on('ready', () => {
  console.log('Kweh! Choco Bot is now up and running!');
});

import { ChocoBotCore } from '@team-choco/core';
import { ChocoCommandPlugin } from '@team-choco/command-plugin';

import { CONFIG } from './config';
import { getPlatform } from './platform';

import { COMMANDS } from './commands';
import { logger } from './utils/logger';
import { failure } from './utils/embeds';
import { ChocoCommandError, ChocoBotStartOptions } from './types';
import { choco } from './services/choco/choco';

export function start(options: ChocoBotStartOptions = {}): ChocoBotCore {
  if (options.databaseUrl) {
    CONFIG.DATABASE_URL = options.databaseUrl;
  }

  if (options.discordToken) {
    CONFIG.DISCORD_TOKEN = options.discordToken;
  }

  if (options.xivapiToken) {
    CONFIG.XIVAPI_TOKEN = options.xivapiToken;
  }

  if (options.platform) {
    CONFIG.PLATFORM = options.platform;
  }

  if (options.logLevel) {
    CONFIG.LOG_LEVEL = options.logLevel;
  }

  const bot: ChocoBotCore = new ChocoBotCore({
    platform: getPlatform(CONFIG.PLATFORM),

    plugins: [
      new ChocoCommandPlugin({
        prefix: async (message) => {
          if (bot.isServerMessage(message)) {
            const parameter = await choco.parameters.get(message.server_id, 'prefix');

            return parameter ? parameter.value : '!';
          }

          return '!';
        },
      }),
    ],
  });

  if (CONFIG.ENVIRONMENT === 'local') {
    bot.on('@team-choco/command-plugin:before', (details) => {
      logger.info(JSON.stringify({
        Message: details.message.content,
        Author: details.message.author.username,
        Args: details.args,
      }));
    });
  }

  bot.on('@team-choco/command-plugin:after', async ({ message }) => {
    await message.react('👍');
  });

  bot.on('@team-choco/command-plugin:error', async ({ message, error }) => {
    await message.react('⛔');

    if (error instanceof ChocoCommandError) {
      await message.reply(failure(error.messageOptions));
    } else if (CONFIG.ENVIRONMENT === 'local') {
      logger.error(error.message || error);
    }
  });

  console.log(`Registering "${COMMANDS.length}" command(s)...`);

  COMMANDS.forEach((command) => command(bot));

  console.log(`Commands registered successfully!`);

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

  return bot;
}

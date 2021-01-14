import '@team-choco/command-plugin';
import { isConfigParameter } from '../constants';
import { choco } from '../services/choco/choco';
import { i18n } from '../services/i18n';
import { ChocoCommandError } from '../types';
import { success } from '../utils/embeds';

import { ChocoBotCommand } from './types';

export const config: ChocoBotCommand = (bot) => {
  bot.command('config get <key>', async ({ args, message }) => {
    if (!bot.isServerMessage(message)) {
      throw new ChocoCommandError(i18n('CHOCO_CONFIG_REQUIRES_SERVER'));
    }

    if (!isConfigParameter(args.key)) {
      throw new ChocoCommandError(i18n('CHOCO_CONFIG_INVALID_KEY'));
    }

    const parameter = await choco.parameters.get(message.server_id, args.key);

    if (parameter) {
      await message.reply(success({
        content: i18n('CHOCO_CONFIG_GET_SUCCESS', 'en', {
          key: args.key,
          value: parameter.value,
        }),
      }));
    } else {
      await message.reply(success({
        content: i18n('CHOCO_CONFIG_GET_FAILURE', 'en', {
          key: args.key,
        }),
      }));
    }
  });

  bot.command('config set <key> <value>', async ({ args, message }) => {
    if (!bot.isServerMessage(message)) {
      throw new ChocoCommandError(i18n('CHOCO_CONFIG_REQUIRES_SERVER'));
    }

    if (!isConfigParameter(args.key)) {
      throw new ChocoCommandError(i18n('CHOCO_CONFIG_INVALID_KEY'));
    }

    await choco.parameters.save({
      server_id: message.server_id,
      key: args.key,
      value: args.value,
    });

    await message.reply(success({
      content: i18n('CHOCO_CONFIG_SET_SUCCESS', 'en', {
        key: args.key,
      }),
    }));
  });

  bot.command('config remove <key>', async ({ args, message }) => {
    if (!bot.isServerMessage(message)) {
      throw new ChocoCommandError(i18n('CHOCO_CONFIG_REQUIRES_SERVER'));
    }

    if (!isConfigParameter(args.key)) {
      throw new ChocoCommandError(i18n('CHOCO_CONFIG_INVALID_KEY'));
    }

    await choco.parameters.delete(message.server_id, args.key);

    await message.reply(success({
      content: i18n('CHOCO_CONFIG_REMOVE_SUCCESS', 'en', {
        key: args.key,
      }),
    }));
  });
}

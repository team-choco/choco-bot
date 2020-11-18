import outdent from 'outdent';

import { ChocoRandom, ChocoStrings } from '@team-choco/utils';

import { ChocoBotCommand } from './types';
import { success, notify, embed } from '../utils/embeds';
import { xiv } from '../services/xiv';
import { ChocoCommandError } from '../types';
import { getPoweredByFooter } from '../utils/footer';
import { choco } from '../services/choco/choco';
import { i18n } from '../services/i18n';

export const iam: ChocoBotCommand = (bot) => {
  bot.command('iam', async ({ message }) => {
    let characters = await choco.characters.getPendingCharacters(message.author.id);

    if (characters.length === 0) {
      return message.reply(success({
        title: ['IAM', 'Validation'],
        content: i18n('CHOCO_ALL_CHARACTERS_VALIDATED'),
        footer: getPoweredByFooter(xiv.characters.search),
      }));
    }

    characters = await Promise.all(characters.map(async (character) => {
      const { Bio } = await xiv.characters.get(character.lodestone_id);

      if (Bio.includes(character.validation_value)) {
        return await choco.characters.update(message.author.id, character.lodestone_id, {
          validated: true,
        });
      }

      return character;
    }));

    const completed = characters.filter(({ validated }) => validated);
    const pending = characters.filter(({ validated }) => !validated);

    return message.reply(embed(pending.length > 0 ? 'notify' : 'success', {
      title: ['IAM', 'Validation'],
      content: ChocoStrings.concat('\n', [
        completed.length > 0 && outdent`
          ${i18n('CHOCO_CHARACTERS_VALIDATED')}

          ${completed.map((character) =>
            i18n('CHOCO_CHARACTER_INFO_LIST', 'en', character),
          )}
        `,

        pending.length > 0 && outdent`
          ${i18n('CHOCO_CHARACTERS_AWAITING_VALIDATION')}

          ${pending.map((character) =>
            i18n('CHOCO_CHARACTER_INFO_LIST', 'en', character),
          )}
        `,
      ]),
      footer: getPoweredByFooter(xiv.characters.search),
    }));
  });

  bot.command('iam <server> <...name>', async ({ message, args }) => {
    let character = await choco.characters.getByUserIDAndServerAndName(message.author.id, args.server, args.name);

    if (character && character.validated) {
      return message.reply(success({
        title: ['IAM', 'Character Setup'],
        content: i18n('CHOCO_CHARACTER_ALREADY_VALIDATED'),
        footer: getPoweredByFooter(xiv.characters.search),
      }));
    }

    if (!character) {
      const response = await xiv.characters.search({
        name: args.name,
        server: args.server,
      });

      if (response.Results.length === 0) {
        throw new ChocoCommandError(i18n('LODESTONE_NO_CHARACTERS_EXIST'));
      } else if (response.Results.length > 1) {
        throw new ChocoCommandError(i18n('LODESTONE_MULTIPLE_CHARACTERS_EXIST'));
      }

      const [result] = response.Results;

      character = await choco.characters.add({
        user_id: message.author.id,
        lodestone_id: result.ID,
        server: result.Server.split(' ')[0],
        name: result.Name,
        validation_value: ChocoRandom.anon(`${message.author.id}@${result.ID}`),
        validated: false,
        main: await choco.characters.empty(message.author.id),
      });
    }

    const { Bio } = await xiv.characters.get(character.lodestone_id);

    if (Bio.includes(character.validation_value)) {
      await choco.characters.update(message.author.id, character.lodestone_id, {
        validated: true,
      });

      return message.reply(success({
        title: ['IAM', 'Character Setup'],
        content: i18n('CHOCO_CHARACTER_VALIDATED'),
        footer: getPoweredByFooter(xiv.characters.search),
      }));
    }

    return message.reply(notify({
      title: ['IAM', 'Character Setup'],
      content: outdent`
        ${i18n('ALMOST_THERE')}

        ${i18n('CHOCO_ADD_CHARACTER_CODE', 'en', character)}
      `,
      fields: [{
        name: i18n('CODE'),
        value: `\`${character.validation_value}\``,
      }],
      footer: getPoweredByFooter(xiv.characters.search),
    }));
  });
};

export const whois: ChocoBotCommand = (bot) => {
  bot.command('whois <server> <...name>', async ({ message, args }) => {
    const character = await choco.characters.getByUserIDAndServerAndName(message.author.id, args.server, args.name);

    if (!character) {
      throw new ChocoCommandError({
        title: `Characters`,
        content: i18n('CHOCO_CHARACTER_NOT_FOUND'),
      });
    }

    return message.reply(success({
      title: character.name,
    }));
  });

  bot.command('whois <mention>', async ({ message, args }) => {
    const [, id] = args.mention.match(/^<@!?(\d+)>$/) || [];

    const characters = await choco.characters.get(id);

    if (characters.length === 0) {
      throw new ChocoCommandError({
        title: `Characters`,
        content: i18n('CHOCO_USER_NO_CHARACTERS'),
      });
    }

    return message.reply(success({
      title: `Characters`,
      content: outdent`
        ${i18n('CHOCO_CHARACTERS_BELONG_TO', 'en', { id })}

        ${characters.map((character) =>
          i18n('CHOCO_CHARACTER_INFO_LIST', 'en', character),
        )}
      `,
    }));
  });

  bot.command('characters', async ({ message }) => {
    const characters = await choco.characters.get(message.author.id);

    if (characters.length === 0) {
      throw new ChocoCommandError({
        title: `Characters`,
        content: i18n('CHOCO_AUTHOR_NO_CHARACTERS'),
      });
    }

    return message.reply(success({
      title: `Characters`,
      content: outdent`
        ${i18n('CHOCO_CHARACTERS_BELONG_TO', 'en', { id: message.author.id })}

        ${characters.map((character) =>
          i18n('CHOCO_CHARACTER_INFO_LIST', 'en', character),
        )}
      `,
    }));
  });
};

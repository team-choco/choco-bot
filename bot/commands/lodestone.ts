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
        content: `You don't have any characters left to validate!`,
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
          ${i18n('CHARACTER_LIST_VALIDATED')}

          ${completed.map((character) =>
            i18n('CHARACTER_INFO', 'en', character),
          )}
        `,

        pending.length > 0 && outdent`
          ${i18n('CHARACTER_LIST_AWAITING_VALIDATION')}

          ${pending.map((character) =>
            i18n('CHARACTER_INFO', 'en', character),
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
        content: `You've already validated this character!`,
        footer: getPoweredByFooter(xiv.characters.search),
      }));
    }

    if (!character) {
      const response = await xiv.characters.search({
        name: args.name,
        server: args.server,
      });

      if (response.Results.length === 0) {
        throw new ChocoCommandError('No characters exist with that name!');
      } else if (response.Results.length > 1) {
        throw new ChocoCommandError('Multiple characters with the given name detected.');
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
        content: `You've successfully validated your character!`,
        footer: getPoweredByFooter(xiv.characters.search),
      }));
    }

    return message.reply(notify({
      title: ['IAM', 'Character Setup'],
      content: outdent`
        Kweh! You're almost there!

        Just add the code below to your [Character Profile](https://na.finalfantasyxiv.com/lodestone/character/${character.lodestone_id}/)!
      `,
      fields: [{
        name: 'Code',
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
      throw new ChocoCommandError(`Oh no! That character doesn't exist in our records!`);
    }

    return message.reply(success({
      title: character.name,
    }));
  });

  bot.command('whois <mention>', async ({ message, args }) => {
    const [, id] = args.mention.match(/^<@!?(\d+)>$/) || [];

    const characters = await choco.characters.get(id);

    if (characters.length === 0) {
      throw new ChocoCommandError(`Oh no! That user doesn't have any characters!`);
    }

    return message.reply(success({
      title: `Characters`,
      content: outdent`
        Kweh! Here are the characters that belong to <@${id}>!

        ${characters.map((character) =>
          i18n('CHARACTER_INFO', 'en', character),
        )}
      `,
    }));
  });
};

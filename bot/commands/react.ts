import '@team-choco/command-plugin';

import { ChocoBotCommand } from './types';
import { ChocoCommandError } from '../types';
import { i18n } from '../services/i18n';
import { EMOJI } from '../constants';
import { notify } from '../utils/embeds';
import { chunk } from '../utils/array';

const REACTION_TYPES: { [key: string]: EMOJI|EMOJI[] } = {
  'roles': [
    EMOJI.ANY_ROLE,
    EMOJI.TANK,
    EMOJI.HEALER,
    EMOJI.DPS,
  ],

  'anyrole': EMOJI.ANY_ROLE,
  'tank': EMOJI.TANK,
  'healer': EMOJI.HEALER,
  'dps': EMOJI.DPS,

  // Tanks
  'pld': EMOJI.PALADIN,
  'war': EMOJI.WARRIOR,
  'drk': EMOJI.DARK_KNIGHT,
  'gnb': EMOJI.GUNBREAKER,

  // Healers

  'whm': EMOJI.WHITE_MAGE,
  'sch': EMOJI.SCHOLAR,
  'ast': EMOJI.ASTROLOGIAN,

  // Physical Melee DPS
  'drg': EMOJI.DRAGOON,
  'mnk': EMOJI.MONK,
  'nin': EMOJI.NINJA,
  'sam': EMOJI.SAMURAI,

  // Physical Ranged DPS
  'brd': EMOJI.BARD,
  'mch': EMOJI.MACHINIST,
  'dnc': EMOJI.DANCER,

  // Magical Ranged DPS
  'blm': EMOJI.BLACK_MAGE,
  'smn': EMOJI.SUMMONER,
  'rdm': EMOJI.RED_MAGE,
  'blu': EMOJI.BLUE_MAGE,
};

export const react: ChocoBotCommand = (bot) => {
  bot.command('react', async ({ message }) => {
    const chunkedTypes = chunk(Object.keys(REACTION_TYPES).map((type) =>
      `- ${type}`,
    ), 5);

    await message.reply(notify({
      title: ['React'],
      content: i18n('CHOCO_REACTION_TYPES', 'en', {
        types: Object.keys(REACTION_TYPES),
      }),
      fields: chunkedTypes.map((types, i) => ({
        name: `Types (${i + 1}/${chunkedTypes.length})`,
        value: types.join('\r\n'),
        inline: true,
      })),
    }));
  });

  bot.command('react <type> <link>', async ({ args }) => {
    const REACTIONS = REACTION_TYPES[args.type.toLowerCase()];

    if (!REACTIONS) {
      throw new ChocoCommandError(i18n('CHOCO_UNKNOWN_REACTION_TYPE', 'en', {
        type: args.type,
      }));
    }

    const [, , channelID, messageID] = args.link.match(/^https:\/\/discord.com\/channels\/(\d+|@me)\/(\d+)\/(\d+)\/?$/);

    const message = await bot.message(channelID, messageID);

    if (message === null) {
      throw new ChocoCommandError(i18n('CHOCO_MESSAGE_DOES_NOT_EXIST'));
    }

    if (Array.isArray(REACTIONS)) {
      for (const REACTION of REACTIONS) {
        await message.react(REACTION);
      }
    } else {
      await message.react(REACTIONS);
    }
  });
}

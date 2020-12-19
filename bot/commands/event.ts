import moment from 'moment';
import { outdent } from 'outdent';

import { EMOJI } from '../constants';
import { i18n } from '../services/i18n';
import { notify } from '../utils/embeds';
import { ChocoBotCommand } from './types';


/*
 * User: !event Slice of Late Night: SOS Ex with Cecilia Sanare
 * Bot: What content is this event for?
 * User: Seat of Sacrifice Extreme
 * Bot: What should the title of the event be?
 * User: Slice of Late Night: SOS Ex
 * Bot: Who's hosting it?
 * User: @Ceci @BlueZeta
 * Bot: When would you like it to take place?
 * User: 12/3/2020
 * Bot: What time?
 * User: 9 PM CST
 * Bot: What would you like the description to say?
 * User: An encore learning party. Looking to pick up where the previous party left off.
 */
export const event: ChocoBotCommand = (bot) => {
  bot.command('event', async ({ message, args }) => {
    const title = 'Slice of Late Night: SOS Ex with Kanari Okori';
    const time = '12/3/2020 @ 9 PM CST';
    const description = 'An encore learning party. Looking to pick up where the previous party left off.';

    const date = moment(time, [
      'MM/DD/YYYY @ h A z',
      'MM/DD/YYYY @ h:mm A z'
    ]);

    const event = await message.reply(notify({
      title: [title],
      fields: [{
        name: 'Date',
        value: date.format('MM/DD/YYYY'),
      }, {
        name: 'Time',
        value: date.format('h:mm A z'),
      }],
      content: outdent`
        ${description}
      `,
      footer: {
        content: 'Please react with your intended job if you would like to join!'
      }
    }));

    await event.react(EMOJI.AnyRole);
    await event.react(EMOJI.Tank);
    await event.react(EMOJI.Healer);
    await event.react(EMOJI.DPS);
  });
};

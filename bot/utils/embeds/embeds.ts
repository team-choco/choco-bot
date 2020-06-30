import { ChocoRawMessageOptions, ChocoRawEmbed } from '@team-choco/core';

import { ChocoBotMessageOptions } from './types';
import { COLORS } from '../../constants';

function title(title?: string|string[]): (undefined|string) {
  return Array.isArray(title) ? title.join(' ¦ ') : title;
}

export type EmbedType = keyof typeof EMBED_COLORS;

export const EMBED_COLORS = {
  success: COLORS.SUCCESS,
  notify: COLORS.NOTIFY,
  failure: COLORS.FAILURE,
}

export const EMBED_DEFAULTS: {
  [key: string]: ChocoRawEmbed;
} = {
  success: {},
  notify: {},
  failure: {
    title: 'Error!',
  },
}

export function embed(type: EmbedType, options: ChocoBotMessageOptions): ChocoRawMessageOptions {
  return {
    embed: {
      ...EMBED_DEFAULTS[type],
      color: EMBED_COLORS[type],
      ...options,
      title: title(options.title) || EMBED_DEFAULTS[type].title,
    },
  };
}

/**
 * Use this to notify users that everything went A-OK!
 *
 * @param options - the message options.
 */
export function success(options: ChocoBotMessageOptions): ChocoRawMessageOptions {
  return embed('success', options);
}

/**
 * Use this to notify users that they have something they need to do!
 *
 * @param options - the message options.
 */
export function notify(options: ChocoBotMessageOptions): ChocoRawMessageOptions {
  return embed('notify', options);
}

/**
 * Use this to notify users that everything is on fire!
 *
 * @param options - the message options.
 */
export function failure(options: ChocoBotMessageOptions): ChocoRawMessageOptions {
  return embed('failure', options);
}

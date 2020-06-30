import { getPoweredBy } from '@team-choco/xiv';
import { ChocoEmbedFooter } from '@team-choco/core';

export const ICON_URLS: {
  [key: string]: string;
} = {
  xivapi: 'https://xivapi.com/logo.png',
};

export const NAMES: {
  [key: string]: string;
} = {
  xivapi: 'XIV API',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getPoweredByFooter(target: any): (undefined|ChocoEmbedFooter) {
  const poweredBy = getPoweredBy(target);

  if (!poweredBy) return undefined;

  const displayName = NAMES[poweredBy.name] || poweredBy.name;

  return {
    content: `Powered by ${displayName}`,
    iconURL: ICON_URLS[poweredBy.name],
  };
}

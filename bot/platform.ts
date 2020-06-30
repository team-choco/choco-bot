import { ChocoPlatform } from '@team-choco/core';
import { ChocoDiscordPlatform } from '@team-choco/discord-platform';
import { ChocoShellPlatform } from '@team-choco/shell-platform';
import { CONFIG, PlatformType } from './config';

export function getPlatform(type: PlatformType): ChocoPlatform {
  if (type === 'discord') {
    if (!CONFIG.DISCORD_TOKEN) {
      throw new Error(`Expected "DISCORD_TOKEN" to be defined.`);
    }

    return new ChocoDiscordPlatform({
      token: CONFIG.DISCORD_TOKEN,
    });
  }

  return new ChocoShellPlatform({
    name: 'Choco Bot',
  });
}

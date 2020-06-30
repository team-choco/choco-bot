import 'dotenv/config';
import pkg from '../package.json';
import { LogType, isLogType } from '@team-choco/utils';

export type PlatformType = ('shell'|'discord');
export const PLATFORMS: PlatformType[] = ['shell', 'discord'];

export type Environment = ('local'|'live');
export const ENVIRONMENTS: Environment[] = ['local', 'live'];

export function isPlatform(value?: string): value is PlatformType {
  return Boolean(value) && PLATFORMS.includes(value as PlatformType);
}

export function isEnvironment(value?: string): value is Environment {
  return Boolean(value) && ENVIRONMENTS.includes(value as Environment);
}

export function usePlatform(value: (undefined|string), defaultValue: PlatformType): PlatformType {
  if (isPlatform(value)) {
    console.log(`Using "${value}" as the active platform!`);
    return value;
  }

  console.log(`Falling back to the "${defaultValue}" platform...`);
  return defaultValue;
}

export interface Config {
  DATABASE_URL: string;
  DISCORD_TOKEN: (null|string);
  XIVAPI_TOKEN: (null|string);

  PLATFORM: PlatformType;
  ENVIRONMENT: Environment;
  VERSION: string;
  LOG_LEVEL: LogType;
}

export const CONFIG: Config = {
  DATABASE_URL: process.env.CHOCO_BOT_DATABASE_URL || 'sqlite://db.sqlite',

  DISCORD_TOKEN: process.env.CHOCO_BOT_DISCORD_TOKEN || null,
  XIVAPI_TOKEN: process.env.CHOCO_BOT_XIVAPI_TOKEN || null,

  PLATFORM: usePlatform(process.env.CHOCO_BOT_PLATFORM, 'shell'),
  ENVIRONMENT: isEnvironment(process.env.CHOCO_BOT_ENVIRONMENT) ? process.env.CHOCO_BOT_ENVIRONMENT : 'local',
  VERSION: pkg.version,
  LOG_LEVEL: isLogType(process.env.CHOCO_BOT_LOG_LEVEL) ? process.env.CHOCO_BOT_LOG_LEVEL : 'info',
};

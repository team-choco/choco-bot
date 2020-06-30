import 'dotenv/config';

export type PlatformType = ('shell'|'discord');
export const PLATFORMS: PlatformType[] = ['shell', 'discord'];

export function isPlatform(value?: string): value is PlatformType {
  return Boolean(value) && PLATFORMS.includes(value as PlatformType);
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
  DISCORD_TOKEN: (null|string);
  PLATFORM: PlatformType;
  VERSION: string;
}

export const CONFIG: Config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || null,
  PLATFORM: usePlatform(process.env.PLATFORM, 'shell'),
  VERSION: process.env.VERSION || '0.0.0-local.0',
};

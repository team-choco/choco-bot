import { ChocoBotMessageOptions } from './utils/embeds';
import { PlatformType } from './config';
import { LogType } from '@team-choco/utils';

export class ChocoCommandError extends Error {
  public messageOptions: ChocoBotMessageOptions;

  constructor(messageOptions: (string | ChocoBotMessageOptions)) {
    if (typeof (messageOptions) === 'string') {
      messageOptions = {
        content: messageOptions,
      };
    }

    super(messageOptions.content);

    this.messageOptions = messageOptions;
  }
}

export interface ChocoBotStartOptions {
  /**
   * Specify the Database Connection URL
   */
  databaseUrl?: string;

  /**
   * The Discord Token.
   */
  discordToken?: string;

  /**
   * The Token for https://xivapi.com
   */
  xivapiToken?: string;

  /**
   * The platform to run on.
   */
  platform?: PlatformType;

  /**
   * The level of log output to provide.
   */
  logLevel?: LogType;
}

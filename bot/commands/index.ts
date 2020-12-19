import { ChocoBotCommand } from './types';

import * as DebugCommands from './debug';
import * as LodestoneCommands from './lodestone';
import * as EventCommands from './event';

export const COMMANDS: ChocoBotCommand[] = [
  ...Object.values(DebugCommands),
  ...Object.values(LodestoneCommands),
  ...Object.values(EventCommands),
];

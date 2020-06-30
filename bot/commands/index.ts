import { ChocoBotCommand } from './types';

import * as DebugCommands from './debug';
import * as LodestoneCommands from './lodestone';

export const COMMANDS: ChocoBotCommand[] = [
  ...Object.values(DebugCommands),
  ...Object.values(LodestoneCommands),
];

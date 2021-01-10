import { ChocoBotCommand } from './types';

import * as DebugCommands from './debug';
import * as ReactCommands from './react';
// import * as LodestoneCommands from './lodestone';

export const COMMANDS: ChocoBotCommand[] = [
  ...Object.values(DebugCommands),
  ...Object.values(ReactCommands),
  // ...Object.values(LodestoneCommands),
];

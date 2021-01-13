import { ChocoBotCommand } from './types';

import * as DebugCommands from './debug';
import * as ReactCommands from './react';

export const COMMANDS: ChocoBotCommand[] = [
  ...Object.values(DebugCommands),
  ...Object.values(ReactCommands),
];

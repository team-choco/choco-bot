import { ChocoBotCommand } from './types';

import * as TestCommands from './help'
import * as DebugCommands from './debug';
import * as ReactCommands from './react';
import * as ConfigCommands from './config';

export const COMMANDS: ChocoBotCommand[] = [
  ...Object.values(DebugCommands),
  ...Object.values(ReactCommands),
  ...Object.values(ConfigCommands),
  ...Object.values(TestCommands),   
];

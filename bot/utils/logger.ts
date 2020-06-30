import { Logger } from '@team-choco/utils';

import { CONFIG } from '../config';

export const logger = new Logger(CONFIG.LOG_LEVEL);
import { XIV } from '@team-choco/xiv';
import { CONFIG } from '../config';

export const xiv = new XIV({
  xivapi: CONFIG.XIVAPI_TOKEN,
});

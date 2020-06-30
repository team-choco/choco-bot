import { Throttle, Throttler } from '../utils/throttle';

export class XIVAPI {
  private throttle: Throttler = Throttle(10);
}

export type QueuedRequestCallback = () => Promise<any>;

export interface QueuedRequest {
  request: QueuedRequestCallback;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

export type Throttler = (cb: QueuedRequestCallback) => Promise<any>;

/**
 * Throttles the number of active requests.
 *
 * @param limit - the maximum number of requests.
 */
export function Throttle(limit: number): Throttler {
  const queue: Promise<any>[] = [];
  const pending: Promise<any>[] = [];

  return async (cb: QueuedRequestCallback) => {
    if (queue.length >= limit) {
      const promise: Promise<any> = Promise.resolve().then(async () => {
        if (pending.length) {
          // Wait for the existing pending requests to finish.
          await Promise.all(pending);
        }

        // Check if the queue is still full.
        if (queue.length >= limit) {
          await Promise.race(queue);
        }

        return cb();
      });

      pending.push(promise);
      try {
        return await promise;
      } finally {
        const index = pending.indexOf(promise);
        pending.splice(index, 1);
      }
    }

    const promise = cb();
    queue.push(promise);

    try {
      return await promise;
    } finally {
      const index = queue.indexOf(promise);
      queue.splice(index, 1);
    }
  };
}

/**
 * Retry a given function.
 *
 * @param times - the maximum number of retries.
 * @param cb - the callback to retry.
 * @returns the callbacks response.
 */
export async function retry<T>(times: number, cb: () => Promise<T>): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    if (times <= 0) {
      throw error;
    }

    return retry(times - 1, cb);
  }
}

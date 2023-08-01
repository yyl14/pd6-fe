/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a new fetcher function that ignores first argument, and wraps args in object, in order to fit the argument shape of useSWRMutation.
 */
const toSWRMutationFetcher =
  <T, R>(typedFetch: (arg: T, init?: RequestInit | undefined) => R) =>
  (_: any, { arg }: { arg: T }) =>
    typedFetch(arg);

export default toSWRMutationFetcher;

import { useMemo } from 'react';

/**
 * Utility that converts data shape returned by SWR into Redux state shape.
 */
const useReduxStateShape = <T extends { id: string | number }>(arr: T[] | undefined) => {
  const byId = useMemo(() => arr?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}) ?? {}, [arr]);
  const ids = useMemo(() => arr?.map((item) => item.id) ?? [], [arr]);

  return [byId, ids];
};

export default useReduxStateShape;

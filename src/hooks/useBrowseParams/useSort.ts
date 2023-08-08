import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { transformSort } from '@/function/serializeBrowseParams';

import { SortItem, SortOrder } from './types';
import useBrowseParamsQueries from './useBrowseParamsQueries';

const useSort = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataSchema extends Record<string, any>,
  BaseSortKey extends keyof DataSchema | never = never,
>(
  baseSort?: SortItem<DataSchema, BaseSortKey>,
) => {
  const { sortQuery, setSortQuery } = useBrowseParamsQueries();
  const history = useHistory();

  const createSort = useCallback(
    <K extends keyof DataSchema>(column: K, order: SortOrder): SortItem<DataSchema, K> => ({
      column,
      order,
    }),
    [],
  );

  const defaultValue = useMemo(
    () => [
      ...(sortQuery && Array.isArray(sortQuery)
        ? sortQuery.map(
            ([column, order]) => createSort(column as keyof DataSchema, order as SortOrder), // TODO: Validate sort query value
          )
        : []),
    ],
    [createSort, sortQuery],
  );

  const [sort, setSort] = useState<SortItem<DataSchema, keyof DataSchema>[]>(defaultValue);

  const setSortWithQuery = (
    reducer: (state: SortItem<DataSchema, keyof DataSchema>[]) => SortItem<DataSchema, keyof DataSchema>[],
  ) => {
    setSort(reducer);
    setSortQuery(transformSort(reducer(sort)));
  };

  useEffect(() => {
    setSort(defaultValue);
  }, [defaultValue, history.location.pathname]);

  return {
    sort: [...sort, ...(baseSort ? [baseSort] : [])],
    setSort: setSortWithQuery,
    createSort,
  };
};

export default useSort;

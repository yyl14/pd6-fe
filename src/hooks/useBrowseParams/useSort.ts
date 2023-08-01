import { useState } from 'react';

import { transformSort } from '../../function/serializeBrowseParams';
import { SortItem, SortOrder } from './types';
import useBrowseParamsQueries from './useBrowseParamsQueries';

const useSort = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataSchema extends Record<string, any>,
  BaseSortKey extends keyof DataSchema | never = never,
>(
  baseSort?: SortItem<DataSchema, BaseSortKey>,
) => {
  const { sort: sortQuery, setSortQuery } = useBrowseParamsQueries();

  const createSort = <K extends keyof DataSchema>(column: K, order: SortOrder): SortItem<DataSchema, K> => ({
    column,
    order,
  });

  const [sort, setSort] = useState<SortItem<DataSchema, keyof DataSchema>[]>([
    ...(sortQuery && Array.isArray(sortQuery)
      ? sortQuery.map(
          ([column, order]) => createSort(column as keyof DataSchema, order as SortOrder), // TODO: Validate sort query value
        )
      : []),
    ...(baseSort ? [baseSort] : []),
  ]);

  const setSortWithQuery = (
    reducer: (state: SortItem<DataSchema, keyof DataSchema>[]) => SortItem<DataSchema, keyof DataSchema>[],
  ) => {
    setSort(reducer);
    setSortQuery(transformSort(reducer(sort)));
  };

  return {
    sort,
    setSort: setSortWithQuery,
    createSort,
  };
};

export default useSort;

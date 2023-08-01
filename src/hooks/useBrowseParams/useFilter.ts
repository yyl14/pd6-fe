import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { transformFilter } from '../../function/serializeBrowseParams';
import { FilterItem, FilterOperand, FilterOperator } from './types';
import useBrowseParamsQueries from './useBrowseParamsQueries';

const useFilter = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataSchema extends Record<string, any>,
  BaseFilterKey extends keyof DataSchema | never = never,
  BaseFilterOperator extends FilterOperator | never = never,
>(
  baseFilter?: FilterItem<DataSchema, BaseFilterKey, BaseFilterOperator>,
) => {
  const { filterQuery, setFilterQuery } = useBrowseParamsQueries();
  const history = useHistory();

  const createFilter = useCallback(
    <K extends keyof DataSchema, T extends FilterOperator>(
      column: K,
      operator: T,
      operand: FilterOperand<T, DataSchema[K]> | string,
    ): FilterItem<DataSchema, K, T> => ({
      column,
      operator,
      operand,
    }),
    [],
  );

  const defaultValue = useMemo(
    () => [
      ...(filterQuery && Array.isArray(filterQuery)
        ? filterQuery.map(
            ([column, operator, operand]) =>
              createFilter(column as keyof DataSchema, operator as FilterOperator, operand as string), // TODO: Validate filter query value
          )
        : []),
    ],
    [createFilter, filterQuery],
  );

  const [filter, setFilter] = useState<FilterItem<DataSchema, keyof DataSchema, FilterOperator>[]>(defaultValue);

  const setFilterWithQuery = (
    reducer: (
      state: FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
    ) => FilterItem<DataSchema, keyof DataSchema, FilterOperator>[],
  ) => {
    setFilter(reducer);
    setFilterQuery(transformFilter(reducer(filter)));
  };

  useEffect(() => {
    setFilter(defaultValue);
  }, [defaultValue, history.location.pathname]);

  return {
    filter: [...filter, ...(baseFilter ? [baseFilter] : [])],
    setFilter: setFilterWithQuery,
    createFilter,
  };
};

export default useFilter;

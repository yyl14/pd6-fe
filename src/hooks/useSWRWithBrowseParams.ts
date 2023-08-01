/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import useSWR from 'swr';

import { ApiResponse } from 'openapi-typescript-fetch';
import { FilterItem, FilterOperator, SortItem } from './useBrowseParams/types';

import serializeBrowseParams from '../function/serializeBrowseParams';
import useBrowseParams from './useBrowseParams';

type TypedFetchFunc<A, R> = (arg: A, init?: RequestInit | undefined) => Promise<ApiResponse<R>>;

interface SerializedBrowseParams {
  limit?: number;
  offset?: number;
  filter?: string;
  sort?: string;
}

interface ResponseWithTotalCount {
  data: {
    total_count: number;
  };
}

const useSWRWithBrowseParams = <
  Args extends SerializedBrowseParams,
  Response extends ResponseWithTotalCount,
  DataSchema extends Record<string, any>,
  BaseFilterKey extends keyof DataSchema,
  BaseFilterOperator extends FilterOperator,
  BaseSortKey extends keyof DataSchema,
>(
  key: string,
  typedFetch: TypedFetchFunc<Args, Response>,
  params: Omit<Args, keyof SerializedBrowseParams>,
  bases?: {
    baseFilter?: FilterItem<DataSchema, BaseFilterKey, BaseFilterOperator>;
    baseSort?: SortItem<DataSchema, BaseSortKey>;
  },
) => {
  const { browseParams, setTotalCount, pagination, filter, sort } = useBrowseParams<
    DataSchema,
    BaseFilterKey,
    BaseFilterOperator,
    BaseSortKey
  >(bases);
  const swr = useSWR([key, browseParams], () =>
    typedFetch({ ...params, ...serializeBrowseParams(browseParams) } as Args),
  );

  const totalCount = swr.data?.data.data.total_count;

  useEffect(() => setTotalCount(totalCount), [setTotalCount, totalCount]);

  return { ...swr, pagination, filter, sort };
};

export const withDataSchema =
  <DataSchema extends Record<string, any>>() =>
  <
    Args extends SerializedBrowseParams,
    Response extends {
      data: {
        total_count: number;
      };
    },
    BaseFilterKey extends keyof DataSchema,
    BaseFilterOperator extends FilterOperator,
    BaseSortKey extends keyof DataSchema,
  >(
    key: string,
    typedFetch: TypedFetchFunc<Args, Response>,
    params: Omit<Args, keyof SerializedBrowseParams>,
    bases?: {
      baseFilter?: FilterItem<DataSchema, BaseFilterKey, BaseFilterOperator>;
      baseSort?: SortItem<DataSchema, BaseSortKey>;
    },
  ) =>
    useSWRWithBrowseParams<Args, Response, DataSchema, BaseFilterKey, BaseFilterOperator, BaseSortKey>(
      key,
      typedFetch,
      params,
      bases,
    );

export default useSWRWithBrowseParams;

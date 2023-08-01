import { FilterInterface, FilterItem, FilterOperator, PaginationInterface, SortInterface, SortItem } from './types';
import useFilter from './useFilter';
import usePagination from './usePagination';
import useSort from './useSort';

const useBrowseParams = <
  DataSchema extends Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any,
  BaseFilterKey extends keyof DataSchema = never,
  BaseFilterOperator extends FilterOperator = never,
  BaseSortKey extends keyof DataSchema = never,
>(bases?: {
  baseFilter?: FilterItem<DataSchema, BaseFilterKey, BaseFilterOperator>;
  baseSort?: SortItem<DataSchema, BaseSortKey>;
}) => {
  const baseFilter = bases?.baseFilter;
  const baseSort = bases?.baseSort;

  const {
    limit,
    offset,
    setTotalCount,
    rowsPerPage,
    currentPage,
    totalNumberOfPages,
    setRowsPerPage,
    handlePrevPage,
    handleNextPage,
    handleSetCurrentPage,
  } = usePagination();

  const { filter, setFilter, createFilter } = useFilter<DataSchema, BaseFilterKey, BaseFilterOperator>(baseFilter);

  const { sort, setSort, createSort } = useSort<DataSchema, BaseSortKey>(baseSort);

  return {
    browseParams: {
      limit,
      offset,
      filter,
      sort,
    },
    setTotalCount,
    pagination: {
      rowsPerPage,
      currentPage,
      totalNumberOfPages,
      setRowsPerPage,
      handlePrevPage,
      handleNextPage,
      handleSetCurrentPage,
    } as PaginationInterface,
    filter: {
      filter,
      setFilter,
      createFilter,
    } as FilterInterface<DataSchema>,
    sort: {
      sort,
      setSort,
      createSort,
    } as SortInterface<DataSchema>,
  };
};

export default useBrowseParams;

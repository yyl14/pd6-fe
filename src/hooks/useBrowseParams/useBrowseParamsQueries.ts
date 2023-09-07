import { useMemo } from 'react';

import useQuery from '../useQuery';

const useBrowseParamsQueries = () => {
  const [query, setQuery] = useQuery();

  const rowsPerPageQueryString = query.get('rows');
  const pageQueryString = query.get('page');
  const filterQueryString = query.get('filter');
  const sortQueryString = query.get('sort');

  const rowsPerPageQuery = useMemo(
    () => (rowsPerPageQueryString ? Number(rowsPerPageQueryString) : null),
    [rowsPerPageQueryString],
  );
  const pageQuery = useMemo(() => (pageQueryString ? Number(pageQueryString) : null), [pageQueryString]);
  const filterQuery = useMemo(() => (filterQueryString ? JSON.parse(filterQueryString) : null), [filterQueryString]);
  const sortQuery = useMemo(() => (sortQueryString ? JSON.parse(sortQueryString) : null), [sortQueryString]);

  const setRowsPerPageQuery = (newValue: number) => {
    setQuery('rows', String(newValue));
  };

  const setPageQuery = (newValue: number) => {
    setQuery('page', String(newValue));
  };

  const setFilterQuery = (newValue: string) => {
    setQuery('filter', newValue);
  };

  const setSortQuery = (newValue: string) => {
    setQuery('sort', newValue);
  };

  return {
    rowsPerPageQuery,
    pageQuery,
    filterQuery,
    sortQuery,
    setRowsPerPageQuery,
    setPageQuery,
    setFilterQuery,
    setSortQuery,
  };
};

export default useBrowseParamsQueries;

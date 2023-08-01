import { useHistory } from 'react-router-dom';

import useQuery from '../useQuery';

const useBrowseParamsQueries = () => {
  const query = useQuery();
  const history = useHistory();

  const queryStrings = {
    rowsPerPage: query.get('rows'),
    page: query.get('page'),
    filter: query.get('filter'),
    sort: query.get('sort'),
  };

  const queryData = {
    rowsPerPage: queryStrings.rowsPerPage ? Number(queryStrings.rowsPerPage) : null,
    page: queryStrings.page ? Number(queryStrings.page) : null,
    filter: queryStrings.filter ? JSON.parse(queryStrings.filter) : null,
    sort: queryStrings.sort ? JSON.parse(queryStrings.sort) : null,
  };

  const setQuery = (name: string, newValue: string) => {
    if (query.get(name) !== newValue) {
      const { pathname } = history.location;
      query.set(name, String(newValue));
      history.replace({ pathname, search: query.toString() });
    }
  };

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

  return { ...queryData, setRowsPerPageQuery, setPageQuery, setFilterQuery, setSortQuery };
};

export default useBrowseParamsQueries;

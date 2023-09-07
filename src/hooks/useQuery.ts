import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

function useQuery() {
  const history = useHistory();
  const query = useMemo(() => new URLSearchParams(history.location.search), [history]);

  const setQuery = (name: string, newValue: string) => {
    if (query.get(name) !== newValue) {
      const { pathname } = history.location;
      query.set(name, String(newValue));
      history.replace({ pathname, search: query.toString() });
    }
  };

  return [query, setQuery] as const;
}

export default useQuery;

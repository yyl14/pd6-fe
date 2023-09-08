import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useAboutMiddleware = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/about') {
      history.push('/about/team');
    }
  }, [history, location.pathname]);
};

export default useAboutMiddleware;

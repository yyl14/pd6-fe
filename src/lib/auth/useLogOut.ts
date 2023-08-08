import { useHistory } from 'react-router-dom';

import useAuthStore from '@/stores/authStore';

const useLogOut = () => {
  const history = useHistory();
  const clearAuth = useAuthStore((state) => state.clear);
  const logOut = (redirectUrl = '/') => {
    clearAuth();
    history.push(redirectUrl);
  };
  return logOut;
};

export default useLogOut;

import type { RouterChildContext } from 'react-router';

const useLogOut = () => (history: RouterChildContext['router']['history']) => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  // history.push('/login');
};

export default useLogOut;

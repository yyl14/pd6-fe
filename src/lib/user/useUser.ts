import useAccount from '../account/useAccount';
import useUserId from './useUserId';

const useUser = () => {
  const userId = useUserId();

  return useAccount(userId);
};

export default useUser;

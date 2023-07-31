import useAccountClasses from '../class/useAccountClasses';
import useUserId from './useUserId';

const useUserClasses = () => {
  const userId = useUserId();

  return useAccountClasses(userId);
};

export default useUserClasses;

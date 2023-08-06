import useAuthStore from '../../stores/authStore';

const useUserId = () => {
  const { userId } = useAuthStore();

  return Number(userId);
};

export default useUserId;

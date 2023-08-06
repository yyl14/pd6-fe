import useAuthStore from '../../stores/authStore';

const useAuthToken = () => {
  const { authToken } = useAuthStore();

  return authToken;
};

export default useAuthToken;

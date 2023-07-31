const useUserId = () => {
  const userId = localStorage.getItem('id');

  if (!userId) throw Error('No user id in localStorage.');

  return Number(userId);
};

export default useUserId;

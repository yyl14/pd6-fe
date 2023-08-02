const useLogOut = () => () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
};

export default useLogOut;

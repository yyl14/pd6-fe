import axios from 'axios';
import reduxStore from '../store';
import { authConstants } from './user/constants';

const agent = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
});

const { dispatch } = reduxStore;
agent.interceptors.response.use(
  (res) => {
    // 2xx
    if (!res.data.success) {
      console.log(`Response error: ${res.data.error}`);
      console.log(res);

      if (res.data.error.toString() === 'LoginExpired') {
        document.cookie.id = '';
        document.cookie.token = '';
        dispatch({ type: authConstants.AUTH_LOGOUT });
      }

      return Promise.reject(res.data.error);
    }
    return res;
  },
  (error) => Promise.reject(error), // not 2xx
);

export default agent;

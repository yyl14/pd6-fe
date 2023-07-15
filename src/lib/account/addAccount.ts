import api from '../api';

const signUp = api.path('/account').method('post').create();

export default signUp;

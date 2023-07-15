import api from '../api';

const logIn = api.path('/account/jwt').method('post').create();

export default logIn;

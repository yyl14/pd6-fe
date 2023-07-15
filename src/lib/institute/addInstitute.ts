import api from '../api';

const addInstitute = api.path('/institute').method('post').create();

export default addInstitute;


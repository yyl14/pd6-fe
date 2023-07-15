import api from '../api';

const readInstitute = api.path('/institute/{institute_id}').method('get').create();

export default readInstitute;

import api from '../api';

const editInstitute = api.path('/institute/{institute_id}').method('patch').create();

export default editInstitute;

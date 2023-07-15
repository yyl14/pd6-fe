import api from '../api';

const browseAllInstitute = api.path('/institute').method('get').create();

export default browseAllInstitute;

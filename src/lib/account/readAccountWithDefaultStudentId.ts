import api from '../api';

const readAccountWithDefaultStudentId = api.path('/account/{account_id}').method('get');

export default readAccountWithDefaultStudentId;

import api from '../api';

const getFileLink = api.path('/s3-file/{s3_file_uuid}/url').method('get').create();

export default getFileLink;
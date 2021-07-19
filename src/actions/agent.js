import axios from 'axios';

const API_ROOT = 'https://be.dev.pdogs.ntu.im';

const agent = axios.create({
  baseURL: API_ROOT,
});

export default agent;

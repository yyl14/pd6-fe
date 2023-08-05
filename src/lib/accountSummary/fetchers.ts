import api from '../api';

export const batchGetAccountWithDefaultStudentId = api.path('/account-summary/batch').method('get').create();

export const batchGetAccountByAccountReferrals = api
  .path('/account-summary/batch-by-account-referral')
  .method('get')
  .create();

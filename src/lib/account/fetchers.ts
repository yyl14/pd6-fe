import api from '../api';
import fetchAPI from '../fetchAPI';

export const getAccountTemplateFile = api.path('/account/template').method('get').create();

export const readAccountWithDefaultStudentId = api.path('/account/{account_id}').method('get').create();

export const deleteAccount = api.path('/account/{account_id}').method('delete').create();

export const editAccount = api.path('/account/{account_id}').method('patch').create();

export const addNormalAccount = api.path('/account-normal').method('post').create();

export const editPassword = api.path('/account/{account_id}/pass_hash').method('put').create();

export const importAccount = async ({ file }: { file: Blob }) => {
  const formData = new FormData();
  formData.append('account_file', file);

  const options = {
    method: 'POST',
    body: formData,
  };

  await fetchAPI(`/account-import`, options);
};

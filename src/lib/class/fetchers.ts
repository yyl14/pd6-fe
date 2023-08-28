import api from '../api';
import fetchAPI from '../fetchAPI';

export const readClass = api.path('/class/{class_id}').method('get').create();

export const deleteClass = api.path('/class/{class_id}').method('delete').create();

export const editClass = api.path('/class/{class_id}').method('patch').create();

export const browseAllAccountWithClassRole = api.path('/account/{account_id}/class').method('get').create();

export const browseClass = api.path('/class').method('get').create();

export const browseAllClassUnderCourse = api.path('/course/{course_id}/class').method('get').create();

export const addClassUnderCourse = api.path('/course/{course_id}/class').method('post').create();

export const browseClassMembersWithAccountReferral = api
  .path('/class/{class_id}/member/account-referral')
  .method('get')
  .create();

type AccountType = {
  account_referral: string;
  role: string;
};

interface ReplaceClassMemberResponseType extends Response {
  data: {
    data: boolean[];
    error: string;
    success: boolean;
  };
}

export const replaceClassMembers = async ({ class_id, members }: { class_id: number; members: AccountType[] }) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(members),
  };

  const res = await fetchAPI(`/class/${class_id}/member`, options);
  return res as unknown as ReplaceClassMemberResponseType;
};

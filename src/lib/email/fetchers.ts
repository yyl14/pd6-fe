import api from '../api';

export const emailVerification = api.path('/email-verification').method('post').create({ code: true });

export const resendEmailVerification = api
  .path('/email-verification/{email_verification_id}/resend')
  .method('post')
  .create();

export const deletePendingEmailVerification = api
  .path('/email-verification/{email_verification_id}')
  .method('delete')
  .create();

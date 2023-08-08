import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { deletePendingEmailVerification, resendEmailVerification } from './fetchers';

const useEmailVerification = (emailVerificationId: number) => {
  const resendEmailVerificationSWR = useSWRMutation(
    `/email-verification/${emailVerificationId}/resend`,
    toSWRFetcher(() => resendEmailVerification({ email_verification_id: emailVerificationId })),
  );
  const deletePendingEmailVerificationSWR = useSWRMutation(
    `/email-verification/${emailVerificationId}`,
    toSWRFetcher(() => deletePendingEmailVerification({ email_verification_id: emailVerificationId })),
  );

  return {
    resendEmailVerification: resendEmailVerificationSWR.trigger,
    deletePendingEmailVerification: deletePendingEmailVerificationSWR.trigger,
    isLoading: {
      resendEmailVerification: resendEmailVerificationSWR.isMutating,
      deletePendingEmailVerification: deletePendingEmailVerificationSWR.isMutating,
    },
    error: {
      resendEmailVerification: resendEmailVerificationSWR.error,
      deletePendingEmailVerification: deletePendingEmailVerificationSWR.error,
    },
  };
};

export default useEmailVerification;

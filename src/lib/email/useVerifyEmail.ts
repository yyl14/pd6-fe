import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { emailVerification } from './fetchers';

const useVerifyEmail = (code: string) => {
  const emailVerificationSWR = useSWRMutation(
    '/email-verification',
    toSWRFetcher(() => emailVerification({ code })),
  );

  return {
    emailVerification: emailVerificationSWR.trigger,
    isLoading: {
      emailVerification: emailVerificationSWR.isMutating,
    },
    error: {
      emailVerification: emailVerificationSWR.error,
    },
  };
};

export default useVerifyEmail;

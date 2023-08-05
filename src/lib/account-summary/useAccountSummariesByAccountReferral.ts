import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { batchGetAccountByAccountReferrals } from './fetchers';

const useAccountSummariesByAccountReferral = (accountReferrals: string[]) => {
  const batchGetAccountByAccountReferralsSWR = useSWRMutation(
    `/account-summary/batch-by-account-referral`,
    toSWRFetcher(() => batchGetAccountByAccountReferrals({ account_referrals: JSON.stringify(accountReferrals) })),
  );

  return {
    batchGetAccountByAccountReferrals: batchGetAccountByAccountReferralsSWR.trigger,
    isLoading: {
      accountSummariesByAccountReferral: batchGetAccountByAccountReferralsSWR.isMutating,
    },
    error: {
      accountSummariesByAccountReferral: batchGetAccountByAccountReferralsSWR.error,
    },
  };
};

export default useAccountSummariesByAccountReferral;

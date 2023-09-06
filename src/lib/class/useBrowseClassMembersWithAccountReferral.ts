import useSWR from 'swr';

import { browseClassMembersWithAccountReferral } from './fetchers';

const useBrowseClassMembersWithAccountReferral = (classId: number) => {
  const browseClassMembersWithAccountReferralSWR = useSWR(`/class/${classId}/member/account-referral`, () =>
    browseClassMembersWithAccountReferral({ class_id: classId }),
  );
  return {
    browseClassMembersWithAccountReferral: browseClassMembersWithAccountReferralSWR.data?.data.data,
    mutateBrowseClassMembersWithAccountReferral: browseClassMembersWithAccountReferralSWR.mutate,
    isLoading: {
      browse: browseClassMembersWithAccountReferralSWR.isLoading,
    },
    error: {
      browse: browseClassMembersWithAccountReferralSWR.error,
    },
  };
};

export default useBrowseClassMembersWithAccountReferral;

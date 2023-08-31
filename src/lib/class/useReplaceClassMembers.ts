import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { replaceClassMembers } from './fetchers';

const useReplaceClassMembers = (class_id: number) => {
  const replaceClassMembersSWR = useSWRMutation(`/class/${class_id}/member`, toSWRFetcher(replaceClassMembers));

  return {
    replaceClassMembers: replaceClassMembersSWR.trigger,
    isLoading: {
      replaceClassMembers: replaceClassMembersSWR.isMutating,
    },
    error: {
      replaceClassMembers: replaceClassMembersSWR.error,
    },
  };
};

export default useReplaceClassMembers;

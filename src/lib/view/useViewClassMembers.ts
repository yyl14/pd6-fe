import useSWRWithBrowseParams from 'swr';
import { browseClassMember } from './fetchers';

const useViewClassMembers = (classId: number) => {
  const browseClassMemberSWR = useSWRWithBrowseParams(`/class/{class_id}/view/member`, () =>
    browseClassMember({ class_id: classId }),
  );

  return {
    members: browseClassMemberSWR.data?.data.data,

    isLoading: {
      browse: browseClassMemberSWR.isLoading,
    },

    error: {
      browse: browseClassMemberSWR.error,
    },
  };
};

export default useViewClassMembers;

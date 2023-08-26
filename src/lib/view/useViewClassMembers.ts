import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseClassMember } from './fetchers';

export type ClassMemberSchema = components['schemas']['ViewClassMember'];

const useViewClassMembers = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ClassMemberSchema>();

  const browseClassMemberSWR = useSWRWithBrowseParams(`/class/{class_id}/view/member`, browseClassMember, {
    class_id: classId,
  });

  return {
    browseClassMembers: {
      data: browseClassMemberSWR.data?.data.data,
      refresh: browseClassMemberSWR.mutate,
      pagination: browseClassMemberSWR.pagination,
      filter: browseClassMemberSWR.filter,
      sort: browseClassMemberSWR.sort,
    },

    isLoading: {
      browse: browseClassMemberSWR.isLoading,
    },

    error: {
      browse: browseClassMemberSWR.error,
    },
  };
};

export default useViewClassMembers;

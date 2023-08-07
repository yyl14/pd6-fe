import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseClassMember } from './fetchers';

export type ClassMemberSchema = components['schemas']['ClassMemberData'];

const useViewClassMembers = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ClassMemberSchema>();

  const browseClassMemberSWR = useSWRWithBrowseParams(`/class/{class_id}/view/member`, browseClassMember, {
    class_id: classId,
  });

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

import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseClass } from './fetchers';

export type ClassDataSchema = components['schemas']['pydantic__dataclasses__Class'];

const useClasses = () => {
  const useSWRWithBrowseParams = withDataSchema<ClassDataSchema>();

  const browseClassSWR = useSWRWithBrowseParams(`/class`, browseClass, {}, {});

  return {
    browseClass: {
      data: browseClassSWR.data?.data.data,
      refresh: browseClassSWR.mutate,
      pagination: browseClassSWR.pagination,
      filter: browseClassSWR.filter,
      sort: browseClassSWR.sort,
    },
    isLoading: {
      browse: browseClassSWR.isLoading,
    },
    error: {
      browse: browseClassSWR.error,
    },
  };
};

export default useClasses;

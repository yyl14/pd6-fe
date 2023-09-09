import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useCourse from '@/lib/course/useCourse';

const ClassList = lazy(() => import(/* webpackChunkName: "ClassList" */ '@/pages/ClassList'));

export default function ClassListRoute() {
  const { courseId } = useParams<{ courseId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ClassList)({
        courseId,
        isLoading: courseIsLoading.read,
      })}
    </Suspense>
  );
}

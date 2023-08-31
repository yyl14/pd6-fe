import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';

const ClassMemberList = lazy(() => import('@/pages/ClassMemberList'));

export default function ClassMemberListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ClassMemberList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
      })}
    </Suspense>
  );
}

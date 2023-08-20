import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useCourse from '@/lib/course/useCourse';

const CourseSetting = lazy(() => import('@/pages/CourseSetting'));

export default function CourseSettingRoute() {
  const { courseId } = useParams<{
    courseId: string;
  }>();
  const { isLoading } = useCourse(Number(courseId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(CourseSetting)({
        courseId,
        isLoading: isLoading.read,
      })}
    </Suspense>
  );
}

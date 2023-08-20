import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

const CourseSetting = lazy(() => import('@/pages/CourseSetting'));

export default function CourseSettingRoute() {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(CourseSetting)({
        courseId,
        isLoading: false,
      })}
    </Suspense>
  );
}

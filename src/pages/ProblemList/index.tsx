import PageTitle from '@/components/ui/PageTitle';

export default function ProblemList({ courseId, classId }: { courseId: string; classId: string }) {
  return (
    <>
      <PageTitle text="Problem List" />
      {courseId}
      {classId}
    </>
  );
}

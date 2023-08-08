import PageTitle from '@/components/ui/PageTitle';

export default function CodingProblemInfo({
  courseId,
  classId,
  challengeId,
  problemId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  problemId: string;
}) {
  return (
    <>
      <PageTitle text="Challenge Info" />
      {courseId}
      {classId}
      {challengeId}
      {problemId}
    </>
  );
}

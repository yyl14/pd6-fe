import PageTitle from '@/components/ui/PageTitle';

export default function ChallengeSetting({
  courseId,
  classId,
  challengeId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
}) {
  return (
    <>
      <PageTitle text="Challenge Setting" />
      {`${courseId} ${classId} ${challengeId}`}
    </>
  );
}
import PageTitle from '@/components/ui/PageTitle';

export default function TeamDetail({
  courseId,
  classId,
  teamId,
}: {
  courseId: string;
  classId: string;
  teamId: string;
}) {
  return (
    <>
      <PageTitle text="TeamDetail" />
      <p>{courseId}</p>
      <p>{classId}</p>
      <p>{teamId}</p>
    </>
  );
}

import PageTitle from '@/components/ui/PageTitle';

export default function GradeDetail({ classId, gradeId }: { classId: string; gradeId: string }) {
  return (
    <>
      <PageTitle text="GradeDetail" />
      <p>{classId}</p>
      <p>{gradeId}</p>
    </>
  );
}

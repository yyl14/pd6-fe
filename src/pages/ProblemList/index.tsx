import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import PageTitle from '@/components/ui/PageTitle';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblemScores from '@/lib/problem/useProblemScores';
import type { ProblemSetSchema } from '@/lib/view/useViewClassProblemSets';
import useViewClassProblemSets from '@/lib/view/useViewClassProblemSets';

export default function ProblemList({ courseId, classId }: { courseId: string; classId: string }) {
  const { course } = useCourse(Number(courseId));
  const { class: classes } = useClass(Number(classId));
  const {
    browseProblemSetUnderClass,
    isLoading: classProblemLoading,
    error,
  } = useViewClassProblemSets(Number(classId));
  const { problemScores, isLoading: problemScoresLoading } = useProblemScores(
    browseProblemSetUnderClass.data?.data.map((problem) => problem.problem_id) ?? [],
  );

  return (
    <>
      <PageTitle text={`${course?.name ?? ''} / ${classes?.name ?? ''}`} />
      <BrowsingTable<
        ProblemSetSchema,
        { id: string; Score: string; 'Challenge Title': string; 'Task Label': string; 'Task Title': string }
      >
        columnsConfig={[
          {
            name: 'Score',
            align: 'center',
            type: 'string',
            width: 100,
            minWidth: 80,
          },
          {
            name: 'Challenge Title',
            align: 'center',
            type: 'link',
            width: 200,
            minWidth: 140,
            formatLink: (datum: ProblemSetSchema) =>
              `/6a/problem-set/${courseId}/${classId}/challenge/${datum.challenge_id}`,
          },
          {
            name: 'Task Label',
            align: 'center',
            type: 'string',
            width: 150,
            minWidth: 120,
          },
          {
            name: 'Task Title',
            align: 'center',
            width: 300,
            type: 'string',
            minWidth: 150,
          },
        ]}
        filterConfig={[
          {
            label: 'Challenge Title',
            dataColumn: 'challenge_title',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Task Label',
            dataColumn: 'challenge_label',
            type: 'TEXT',
            operator: 'LIKE',
          },
          {
            label: 'Task Title',
            dataColumn: 'problem_title',
            type: 'TEXT',
            operator: 'LIKE',
          },
        ]}
        data={browseProblemSetUnderClass.data?.data}
        dataToRow={(item) => ({
          id: String(item.problem_id),
          Score: String(problemScores?.find((problem) => problem.id === item.problem_id)?.score ?? ''),
          'Challenge Title': item.challenge_title,
          'Task Label': item.challenge_label,
          'Task Title': item.problem_title,
          link: `/6a/problem-set/${courseId}/${classId}/challenge/${item.challenge_id}/problem/${item.problem_id}`,
        })}
        isLoading={classProblemLoading.browse || problemScoresLoading.browse}
        error={error.browse}
        pagination={browseProblemSetUnderClass.pagination}
        filter={browseProblemSetUnderClass.filter}
        sort={browseProblemSetUnderClass.sort}
        hasLink
      />
    </>
  );
}

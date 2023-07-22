import useSWR from 'swr';

import { readStudentCard } from './fetchers';

const useStudentCard = (studentcardId: number) => {
  const readStudentCardSWR = useSWR(`/student-card/${studentcardId}`, 
        () => readStudentCard({ student_card_id: studentcardId }));

  return {
    studentCard: readStudentCardSWR.data?.data.data,
    isLoading: {
      read: readStudentCardSWR.isLoading,
    },
    error: {
      read: readStudentCardSWR.error,
    },
  };
};

export default useStudentCard;
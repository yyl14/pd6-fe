import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useUserClasses from '@/lib/user/useUserClasses';

const useMyClassManagerMiddleware = (courseId: string, classId: string) => {
  const history = useHistory();

  const { accountClasses: userClasses } = useUserClasses();

  useEffect(() => {
    // if role of user in userClasses is not MANAGER, redirect to /6a/my-class
    if (userClasses) {
      const curClass = userClasses.find((userClass) => userClass.class_id === Number(classId));
      if (curClass?.role !== 'MANAGER') {
        history.push(`/6a/my-class/${courseId}/${classId}/challenge`);
      }
    }
  }, [history, userClasses, classId, courseId]);
};

export default useMyClassManagerMiddleware;

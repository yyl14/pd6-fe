import useUserClasses from '@/lib/user/useUserClasses';

const useUserClassRole = (classId: number) => {
  const { accountClasses: userClasses } = useUserClasses();
  return userClasses?.find((userClass) => userClass.class_id === classId)?.role ?? 'GUEST';
};

export default useUserClassRole;

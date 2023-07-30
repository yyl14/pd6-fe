import api from '../api';

// useCourses()
export const browseAllCourse = api.path('/course').method('get').create();

export const addCourse = api.path('/course').method('post').create();

// useCourse(course_id)
export const readCourse = api.path('/course/{course_id}').method('get').create();

export const deleteCourse = api.path('/course/{course_id}').method('delete').create();

export const editCourse = api.path('/course/{course_id}').method('patch').create();

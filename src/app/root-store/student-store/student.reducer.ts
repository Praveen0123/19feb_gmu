import { createReducer, on } from '@ngrx/store';
import { initialStudentState } from './student.state';
import { studentDetailsReceived, requestClearSelectedStudent, requestToSaveStudentCourse, clearErrorState } from './student.actions';
import { PlannerGrouping, Student } from '@gql';




export const reducer = createReducer(
  initialStudentState,

  on(studentDetailsReceived, (state, { student }) =>
  {
    return { ...state, student, error: (student) ? undefined : 'not found' };
  }),

  on(requestClearSelectedStudent, (state) =>
  {
    return { ...state, student: undefined };
  }),

  on(clearErrorState, (state) =>
  {
    return { ...state, error: undefined };
  }),

  on(requestToSaveStudentCourse, (state, { studentCourseInput }) =>
  {

    const courseGrouping: PlannerGrouping = { ...state.student.courseGroupings.find(g => g.id === studentCourseInput.groupingId) };
    const courseIndex = courseGrouping?.courseList?.findIndex(
      c => c.plannerId === studentCourseInput.id
    );
    if (courseIndex > -1)
    {
      const course = { ...courseGrouping?.courseList[courseIndex] };
      course.semester = studentCourseInput.semester;
      course.year = `${studentCourseInput.year}`;
      course.completed = studentCourseInput.completed;
      course.planned = studentCourseInput.planned;
      //console.log(course);
      courseGrouping.courseList = [...courseGrouping.courseList.slice(0, courseIndex), course, ...courseGrouping.courseList.slice(courseIndex + 1)];
      const student: Student = { ...state.student, courseGroupings: [courseGrouping, ...state.student.courseGroupings.filter(x => x.id !== courseGrouping.id)] };

      return { ...state, student };
    } else
    {
      return { ...state };
    }
  })


);







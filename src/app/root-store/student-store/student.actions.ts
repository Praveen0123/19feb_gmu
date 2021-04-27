
import { MilestoneInput, Student, StudentCourseInput, StudentInput } from '@gql';
import { createAction, props } from '@ngrx/store';




export const requestToSaveStudentForm = createAction
  (
    '[ManageStudent] request to save student form form',
    props<{ studentInput: StudentInput; }>()
  );

export const clearErrorState = createAction
  (
    '[ManageStudent] clear error state'
  );

export const requestStudentDetailsByStudentIdOrEmail = createAction(
  '[ManageStudent] request student details by key',
  props<{ studentIdOrEmail: string; }>()
);

export const studentDetailsReceived = createAction
  (
    '[ManageStudent] student details received',
    props<{ student: Student; }>()
  );

export const requestClearSelectedStudent = createAction(
  '[ManageStudent] request clear selected student details'
);


export const studentFailure = createAction(
  '[ManageStudent] student failure',
  props<{ error: any; }>()
);

export const requestToSaveStudentCourse = createAction
  (
    '[ManageStudent] request to save student course',
    props<{ studentCourseInput: StudentCourseInput; }>()
  );

export const studentSuccess = createAction
  (
    '[ManageStudent] student success'
  );

export const requestToSaveStudentMilestone = createAction(
  '[ManageStudent] save student milestone',
  props<{ milestoneInput: MilestoneInput; }>()
);

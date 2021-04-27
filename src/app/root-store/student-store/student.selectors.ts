
import { Student } from '@gql';
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { StudentState, studentFeatureKey } from './student.state';



export const studentSlice = createFeatureSelector<StudentState>(
  studentFeatureKey
);



export const getStudent: MemoizedSelector<object, Student> = createSelector
  (
    studentSlice,
    (state: StudentState): Student => state.student
  );

export const getError: MemoizedSelector<object, any> = createSelector
  (
    studentSlice,
    (state: StudentState): any => state.error
  );





















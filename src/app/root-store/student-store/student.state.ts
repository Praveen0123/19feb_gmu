import { Student } from '@gql';

export const studentFeatureKey = 'manage-student';


export interface StudentState
{
  student: Student;
  error: any;
}

export const initialStudentState: StudentState =
{
  student: undefined,
  error: null
};

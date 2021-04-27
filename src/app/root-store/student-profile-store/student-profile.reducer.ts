import { createReducer, on } from '@ngrx/store';
import { studentProfileSkillsDetailsReceived, studentSkillsTranscriptDetailsReceived } from './student-profile.actions';
import { initialStudentProfileState } from './student-profile.state';


export const reducer = createReducer(
  initialStudentProfileState,

  on(studentProfileSkillsDetailsReceived, (state, { studentProfileSkillList }) =>
  {
    return { ...state, studentProfileSkillList };
  }),

  on(studentSkillsTranscriptDetailsReceived, (state, { studentSkillsTranscriptList }) => 
  {
    return { ...state, studentSkillsTranscriptList };
  }),
);




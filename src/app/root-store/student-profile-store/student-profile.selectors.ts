import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { StudentProfileState, studentProfileFeatureKey, StudentProfileSkillsModel, studentSkillsTranscriptModel } from './student-profile.state';


export const studentProfileSkillsSlice = createFeatureSelector<StudentProfileState>(
  studentProfileFeatureKey
);

export const getStudentProfileSkillsList: MemoizedSelector<object, StudentProfileSkillsModel> = createSelector
  (
    studentProfileSkillsSlice,
    (state: StudentProfileState): StudentProfileSkillsModel => state.studentProfileSkillList
  );


export const getStudentSkillsTranscriptList: MemoizedSelector<object, studentSkillsTranscriptModel[]> = createSelector
  (
    studentProfileSkillsSlice,
    (state: StudentProfileState): studentSkillsTranscriptModel[] => state.studentSkillsTranscriptList
  );
import { createAction, props } from '@ngrx/store';
import { StudentProfileSkillsModel, studentSkillsTranscriptModel } from './student-profile.state';



export const requestStudentProfileDetailsFromSkillsProfile = createAction(
  '[StudentProfile] Request Student Profile Details from Skills Profile',
  props<{ id: string; }>()
);

export const studentProfileSkillsDetailsReceived = createAction
  (
    '[StudentProfile] Student Profile Skills Details Received',
    props<{ studentProfileSkillList: StudentProfileSkillsModel; }>()
  );

export const studentProfileSkillsDetailsFailure = createAction
  (
    '[StudentProfile] Student Profile Skills Details Error',
    props<{ error: any; }>()
  );

export const requestStudentSkillsTranscriptDetailsFromSkillsTranscript = createAction(
  '[StudentProfile] Request Student Skills Transcript Details from Skills Transcript'
);

export const studentSkillsTranscriptDetailsReceived = createAction
  (
    '[StudentProfile] Student Skills Transcript Details Received',
    props<{ studentSkillsTranscriptList: studentSkillsTranscriptModel[]; }>()
  );

export const studentSkillsTranscriptDetailsFailure = createAction
  (
    '[StudentProfile] Student Skills Transcript Details Error',
    props<{ error: any; }>()
  );





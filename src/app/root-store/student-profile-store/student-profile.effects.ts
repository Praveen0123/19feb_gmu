import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IRootState } from '../root-store';
import { Store, select } from '@ngrx/store';
import { concatMap, filter, switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import
{
  requestStudentProfileDetailsFromSkillsProfile, studentProfileSkillsDetailsReceived,
  studentProfileSkillsDetailsFailure, requestStudentSkillsTranscriptDetailsFromSkillsTranscript,
  studentSkillsTranscriptDetailsReceived, studentSkillsTranscriptDetailsFailure
} from './student-profile.actions';
import { StudentProfileSkillsModel, studentSkillsTranscriptModel } from './student-profile.state';
import { getStudentProfileSkillsList } from './student-profile.selectors';
import { StudentProfileService } from './student-profile.service';

@Injectable()
export class StudentProfileEffects
{

  constructor(
    private actions$: Actions,
    private store: Store<IRootState>,
    private studentProfileService: StudentProfileService) { }

  requestStudentProfileDetailsFromSkillsProfile$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestStudentProfileDetailsFromSkillsProfile),
      switchMap((action) =>
      {
        return this.studentProfileService.getStudentProfileSkillsList()
          .pipe
          (
            map((studentProfileSkillList: StudentProfileSkillsModel) => studentProfileSkillsDetailsReceived({ studentProfileSkillList }))
          );
      }),
      catchError(error => of(studentProfileSkillsDetailsFailure({ error })))
    )
  );

  requestStudentSkillsTranscriptDetailsFromSkillsTranscript$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestStudentSkillsTranscriptDetailsFromSkillsTranscript),
      switchMap((action) => 
      {
        return this.studentProfileService.getStudentSkillsTranscriptList()
          .pipe
          (
            map((studentSkillsTranscriptList: studentSkillsTranscriptModel[]) => studentSkillsTranscriptDetailsReceived({ studentSkillsTranscriptList }))
          );
      }),
      catchError(error => of(studentSkillsTranscriptDetailsFailure({ error })))
    )
  );

}

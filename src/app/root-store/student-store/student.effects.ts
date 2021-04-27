
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IRootState } from '../root-store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { requestStudentDetailsByStudentIdOrEmail, requestToSaveStudentCourse, requestToSaveStudentForm, requestToSaveStudentMilestone, studentDetailsReceived, studentFailure, studentSuccess } from './student.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentService } from './student.service';
import { Milestone, Student } from '@gql';
import { RecentSearchModel } from '../coach-store/coach.state';
import { CoachFacadeService } from '../coach-store/coach-facade.service';

@Injectable()

export class StudentEffects
{

  constructor(
    private actions$: Actions,
    private store: Store<IRootState>,
    private studentService: StudentService,
    private coachFacadeService: CoachFacadeService) { }

  requestStudentById$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestStudentDetailsByStudentIdOrEmail),
      switchMap((action) =>
      {
        return this.studentService.getStudentByStudentIdOrEmail(action.studentIdOrEmail)
          .pipe
          (
            tap((student: Student) =>
            {
              if (student)
              {
                const search: RecentSearchModel = {
                  name: `${student.firstName} ${student.lastName} / ${student.pathway.name}`,
                  date: new Date(),
                  email: student.email
                };
                console.log('received student');
                this.coachFacadeService.addSearchHistory(search);
              }
            }),
            map((student: Student) => studentDetailsReceived({ student })
            ));
      }),
      catchError(error => of(studentFailure({ error })))
    )
  );

  requestToSaveStudentForm$ = createEffect(() => this.actions$.pipe(
    ofType(requestToSaveStudentForm),
    switchMap((action) =>
    {
      return this.studentService.saveStudent(action.studentInput).pipe(
        map((student: Student) => studentDetailsReceived({ student }))
      );
    }),
    catchError(error => of(studentFailure({ error })))
  ));

  requestToSaveStudentCourse$ = createEffect(() => this.actions$.pipe(
    ofType(requestToSaveStudentCourse),
    switchMap((action) =>
    {
      return this.studentService.saveStudentCourse(action.studentCourseInput).pipe(
        map((student: Student) => studentSuccess())
      );
    }),
    catchError(error => of(studentFailure({ error })))
  ));

  requestToSaveStudentMilestone$ = createEffect(() => this.actions$.pipe(
    ofType(requestToSaveStudentMilestone),
    switchMap((action) =>
    {
      return this.studentService.saveStudentMilestone(action.milestoneInput).pipe(
        map((milestone: Milestone) => studentSuccess())
      );
    }),
    catchError(error => of(studentFailure({ error })))
  ));
}


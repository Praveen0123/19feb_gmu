import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap, withLatestFrom, filter, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AreaOfStudy } from '@gql';
import { IRootState } from '../root-store';
import { AreaOfStudyService } from './area-of-study.service';
import { requestAreaOfStudyListFromCareersExplorerTab, areaOfStudyListReceived, areaOfStudyFailure, requestAreaOfStudyById, areaOfStudyReceived, requestAreaOfStudyListSilently } from './area-of-study.actions';
import { getAreaOfStudyList } from './area-of-study.selectors';


@Injectable()
export class AreaOfStudyEffects
{

  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>,
      private areaOfStudyService: AreaOfStudyService
    ) { }

  requestAreaOfStudyListFromCareersExplorerTab$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestAreaOfStudyListFromCareersExplorerTab),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              this.store.pipe(select(getAreaOfStudyList))
            )
        )),
      filter(([action, areaOfStudyList]) => !areaOfStudyList),
      switchMap((action) =>
      {
        return this.areaOfStudyService.getAreaOfStudyList()
          .pipe
          (
            map((areaOfStudyList: AreaOfStudy[]) => areaOfStudyListReceived({ areaOfStudyList }))
          );
      }),
      catchError(error => of(areaOfStudyFailure({ error })))
    )
  );

  requestAreaOfStudyListSilently$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestAreaOfStudyListSilently),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              this.store.pipe(select(getAreaOfStudyList))
            )
        )),
      filter(([action, areaOfStudyList]) => !areaOfStudyList),
      switchMap((action) =>
      {
        return this.areaOfStudyService.getAreaOfStudyListSilently()
          .pipe
          (
            map((areaOfStudyList: AreaOfStudy[]) => areaOfStudyListReceived({ areaOfStudyList }))
          );
      }),
      catchError(error => of(areaOfStudyFailure({ error })))
    )
  );


  requestAreaOfStudy$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestAreaOfStudyById),
      switchMap((action) =>
      {
        return this.areaOfStudyService.getAreaOfStudyById(action.areaOfStudyId)
          .pipe
          (
            map((areaOfStudy: AreaOfStudy) => areaOfStudyReceived({ areaOfStudy }))
          );
      }),
      catchError(error => of(areaOfStudyFailure({ error })))
    )
  );






  areaOfStudyFailure$ = createEffect(() => this.actions$.pipe
    (
      ofType(areaOfStudyFailure),
      tap((action) =>
      {
        console.log('AREA OF STUDY FAILURE', action.error);
      })
    )
  );
}

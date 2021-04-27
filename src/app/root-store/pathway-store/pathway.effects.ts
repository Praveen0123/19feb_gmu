import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, catchError, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { Pathway } from '@gql';
import { PathwayService } from './pathway.service';
import { pathwayDetailsReceived, requestDetailsFromPathwayDetailsPage, requestFullPathwayList, pathwayFailure, requestPathwayListFromPathwayExplorerTab, pathwayListReceived, requestPathwayListFromConnectWithCoachPage, requestPathwayListFromPathwayDetailsPage, requestPathwayListFromAdminPage } from './pathway.actions';
import { IRootState } from '../root-store';
import { getPathwayList, getPathway } from './pathway.selectors';


@Injectable()
export class PathwayEffects
{
  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>,
      private pathwayDetailsService: PathwayService
    ) { }

  requestPathwayListFromPathwayExplorerTab$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestPathwayListFromPathwayExplorerTab, requestPathwayListFromConnectWithCoachPage,
        requestPathwayListFromPathwayDetailsPage, requestPathwayListFromAdminPage),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              this.store.pipe(select(getPathwayList))
            )
        )),
      filter(([action, pathwayList]) => !pathwayList),
      switchMap((action) =>
      {
        return this.pathwayDetailsService.getPathwayList()
          .pipe
          (
            map((pathwayList: Pathway[]) => pathwayListReceived({ pathwayList }))
          );
      }),
      catchError(error => of(pathwayFailure({ error })))
    )
  );

  requestFullPathwayList$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestFullPathwayList),
      switchMap((action) =>
      {
        return this.pathwayDetailsService.getFullPathwayList()
          .pipe
          (
            map((pathwayList: Pathway[]) => pathwayListReceived({ pathwayList }))
          );
      }),
      catchError(error => of(pathwayFailure({ error })))
    )
  );
  requestDetailsFromPathwayDetailsPage$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestDetailsFromPathwayDetailsPage),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              this.store.pipe(select(getPathway))
            )
        )),
      filter(([action, selectedPathway]) =>
      {
        if (selectedPathway)
        {
          return (selectedPathway.id !== action.pathwayId);
        }

        return true;
      }),
      switchMap(([action, selectedPathway]) =>
      {
        return this.pathwayDetailsService.getPathwayDetails(action.pathwayId)
          .pipe
          (
            map((pathway: Pathway) => pathwayDetailsReceived({ pathway }))
          );
      }),
      catchError(error => of(pathwayFailure({ error })))
    )
  );
}

import { Injectable } from '@angular/core';
import { Coach } from '@gql';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { IRootState } from '../root-store';
import { coachFailure, coachListReceived, requestCoachList } from './coach.actions';
import { CoachService } from './coach.service';


@Injectable()
export class CoachEffects
{

  constructor(
    private actions$: Actions,
    private store: Store<IRootState>,
    private coachService: CoachService) { }

  requestCoachList$ = createEffect(() => this.actions$.pipe
    (ofType(requestCoachList),
      switchMap((action) =>
      {
        return this.coachService.getCoachList()
          .pipe
          (
            map((coachList: Coach[]) =>
            {
              return coachListReceived({ coachList });
            })
          );
      }),
      catchError(error => of(coachFailure({ error })))
    )
  );
}

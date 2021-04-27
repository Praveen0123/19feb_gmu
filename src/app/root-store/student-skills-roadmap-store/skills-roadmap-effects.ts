import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IRootState } from '../root-store';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { requestskillsRoadmap, skillsRoadmapReceived, skillsRoadmapFailure } from './skills-roadmap-action';
import { concatMap, filter, switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SkillsRoadmapService } from './skills-roadmap-service';
import { getskillRoadmapList } from './skills-roadmap-selectors';
import { SkillsRoadmapModel } from './skills-roadmap-state';

@Injectable()

export class SkillsRoadmapEffects
{

  constructor(
    private actions$: Actions,
    private store: Store<IRootState>,
    private SkillsRoadmapService: SkillsRoadmapService) { }


  requestskillsRoadmap$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestskillsRoadmap),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (

              this.store.pipe(select(getskillRoadmapList))
            )
        )),
      filter(([action, skillRoadmapList]) => !skillRoadmapList),
      switchMap((action) =>
      {
        return this.SkillsRoadmapService.getskillRoadmapList()
          .pipe
          (
            map((skillRoadmapList: SkillsRoadmapModel[]) => skillsRoadmapReceived({ skillRoadmapList }))
          );
      }),
      catchError(error => of(skillsRoadmapFailure({ error })))
    )
  );

}


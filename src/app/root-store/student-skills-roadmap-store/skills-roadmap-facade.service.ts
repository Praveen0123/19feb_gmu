import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRootState, SkillsRoadmapStore } from '../root-store';
import { SkillsRoadmapModel } from './skills-roadmap-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsRoadmapFacadeService
{

  constructor(private store: Store<IRootState>) { }


  requestskillsRoadmap()
  {
    return this.store.dispatch(SkillsRoadmapStore.Actions.requestskillsRoadmap());
  }

  getskillRoadmapList(): Observable<SkillsRoadmapModel[]>
  {
    this.requestskillsRoadmap();
    return this.store.pipe(select(SkillsRoadmapStore.Selectors.getskillRoadmapList));
  }

}

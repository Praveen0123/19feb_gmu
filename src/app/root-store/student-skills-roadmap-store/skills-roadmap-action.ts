
import { createAction, props } from '@ngrx/store';
import { SkillsRoadmapModel } from './skills-roadmap-state';


export const requestskillsRoadmap = createAction
  (
    '[skillsRoadmap] request skills Roadmap ',

  );

export const skillsRoadmapReceived = createAction
  (
    '[skillsRoadmap] skills Roadmap received',
    props<{ skillRoadmapList: SkillsRoadmapModel[]; }>()
  );

export const skillsRoadmapFailure = createAction
  (
    '[skillsRoadmap] skills Roadmap failure',
    props<{ error: any; }>()
  );




import { createReducer, on } from '@ngrx/store';
import { initialStudentState, SkillsRoadmapModel } from './skills-roadmap-state';
import { skillsRoadmapReceived } from './skills-roadmap-action';




export const reducer = createReducer(
  initialStudentState,

  on(skillsRoadmapReceived, (state, { skillRoadmapList }) =>
  {
    return { ...state, skillRoadmapList };
  }),

);







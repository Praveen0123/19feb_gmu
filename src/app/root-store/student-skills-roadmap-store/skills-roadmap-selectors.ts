
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { SkillsRoadmapState, skillsRoadmapFeatureKey, SkillsRoadmapModel } from './skills-roadmap-state';



export const skillRoadmapSlice = createFeatureSelector<SkillsRoadmapState>(
  skillsRoadmapFeatureKey
);



export const getskillRoadmapList: MemoizedSelector<object, SkillsRoadmapModel[]> = createSelector
  (
    skillRoadmapSlice,
    (state: SkillsRoadmapState): SkillsRoadmapModel[] => state.skillRoadmapList
  );



















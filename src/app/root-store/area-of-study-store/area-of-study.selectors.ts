import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';

import { AreaOfStudyState, areaOfStudyFeatureKey } from './area-of-study.state';
import { AreaOfStudy } from '@gql';


export const areaOfStudySlice = createFeatureSelector<AreaOfStudyState>
  (
    areaOfStudyFeatureKey
  );

export const getAreaOfStudyList: MemoizedSelector<object, AreaOfStudy[]> = createSelector
  (
    areaOfStudySlice,
    (state: AreaOfStudyState): AreaOfStudy[] => state.areaOfStudyList
  );

export const getSelectedAreaOfStudy: MemoizedSelector<object, AreaOfStudy> = createSelector
  (
    areaOfStudySlice,
    (state: AreaOfStudyState): AreaOfStudy => state.selectedAreaOfStudy
  );

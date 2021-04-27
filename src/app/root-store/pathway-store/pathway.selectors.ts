import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PathwayState, pathwayFeatureKey } from './pathway.state';
import { Pathway } from '@gql';


export const pathwaySlice = createFeatureSelector<PathwayState>
  (
    pathwayFeatureKey
  );

export const getPathwayList: MemoizedSelector<object, Pathway[]> = createSelector
  (
    pathwaySlice,
    (state: PathwayState): Pathway[] => state.pathwayList
  );

export const getPathway: MemoizedSelector<object, Pathway> = createSelector
  (
    pathwaySlice,
    (state: PathwayState): Pathway => state.pathway
  );

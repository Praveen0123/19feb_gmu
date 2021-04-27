import { Coach, CoachListGQL } from '@gql';
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';

import { CoachState, coachFeatureKey, RecentSearchModel } from './coach.state';


export const coachSlice = createFeatureSelector<CoachState>
  (
    coachFeatureKey
  );

export const getCoachList: MemoizedSelector<object, Coach[]> = createSelector
  (
    coachSlice,
    (state: CoachState): Coach[] => state.coachList
  );

export const getCoachRecentSearchesList: MemoizedSelector<object, RecentSearchModel[]> = createSelector(
  coachSlice,
  (state: CoachState): RecentSearchModel[] => state.recentSearches
);


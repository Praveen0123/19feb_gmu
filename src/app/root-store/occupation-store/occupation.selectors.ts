import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';

import { OccupationState, occupationFeatureKey } from './occupation.state';
import { Occupation, Pathway } from '@gql';


export const occupationSlice = createFeatureSelector<OccupationState>(
  occupationFeatureKey
);

export const getOccupationDetails: MemoizedSelector<object, Occupation> = createSelector
  (
    occupationSlice,
    (state: OccupationState): Occupation => state.occupationModel
  );

export const getOccupationPreview: MemoizedSelector<object, Occupation> = createSelector
  (
    occupationSlice,
    (state: OccupationState): Occupation => state.occupationPreview
  );


export const getOccupationCardList: MemoizedSelector<object, Occupation[]> = createSelector
  (
    occupationSlice,
    (state: OccupationState): Occupation[] => state.occupationCardList
  );

export const getSelectedPathway: MemoizedSelector<object, Pathway> = createSelector
  (
    occupationSlice,
    (state: OccupationState): Pathway => state.selectedPathway
  );

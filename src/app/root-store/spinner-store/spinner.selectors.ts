import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';

import { SpinnerState, spinnerFeatureKey } from './spinner.state';


export const spinnerSlice = createFeatureSelector<SpinnerState>
  (
    spinnerFeatureKey
  );

export const getSpinnerCount: MemoizedSelector<object, number> = createSelector
  (
    spinnerSlice,
    (state: SpinnerState): number => state.spinnerCounter
  );

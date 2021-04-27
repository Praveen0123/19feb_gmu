import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { ConnectCoachState, connectCoachFeatureKey } from './connect-with-coach.state';

export const connectWithCoachSlice = createFeatureSelector<ConnectCoachState>
  (
    connectCoachFeatureKey
  );

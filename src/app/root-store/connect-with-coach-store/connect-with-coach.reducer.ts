import { createReducer, on } from '@ngrx/store';
import { initialConnectCoachState } from './connect-with-coach.state';
import { connectWithCoachReceivedFromServer } from './connect-with-coach.actions';

export const reducer = createReducer
  (
    initialConnectCoachState,
    on(connectWithCoachReceivedFromServer, (state, { connectWithCoach }) =>
    {
      return { ...state, connectWithCoach };
    })
  );

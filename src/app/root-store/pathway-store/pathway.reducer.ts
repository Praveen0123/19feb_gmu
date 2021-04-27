import { createReducer, on } from '@ngrx/store';

import { initialPathwayState } from './pathway.state';
import { pathwayDetailsReceived, pathwayListReceived, requestClearSelectedPathway } from './pathway.actions';


export const reducer = createReducer
  (
    initialPathwayState,

    on(pathwayListReceived, (state, { pathwayList }) =>
    {
      return { ...state, pathwayList };
    }),

    on(pathwayDetailsReceived, (state, { pathway }) =>
    {
      return { ...state, pathway };
    }),

    on(requestClearSelectedPathway, (state) =>
    {
      return { ...state, pathway: undefined };
    })

  );

import { createReducer, on } from '@ngrx/store';

import { showSpinner, hideSpinner } from './spinner.actions';
import { initialSpinnerState } from './spinner.state';


export const reducer = createReducer
  (
    initialSpinnerState,

    on(showSpinner, state =>
    {
      const newSpinnerCount = state.spinnerCounter + 1;

      return { state, spinnerCounter: newSpinnerCount };
    }),

    on(hideSpinner, state =>
    {
      const newSpinnerCount = (state.spinnerCounter > 0) ? state.spinnerCounter - 1 : 0;

      return { state, spinnerCounter: newSpinnerCount };
    })
  );

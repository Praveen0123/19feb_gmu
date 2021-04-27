import { createReducer, on } from '@ngrx/store';

import { initialAreaOfStudyState } from './area-of-study.state';
import { areaOfStudyListReceived, setSelectedAreaOfStudy, areaOfStudyReceived, requestClearSelectedAreaOfStudy } from './area-of-study.actions';


export const reducer = createReducer
  (
    initialAreaOfStudyState,

    // AREA OF STUDY LIST RECEIVED
    on(areaOfStudyListReceived, (state, { areaOfStudyList }) =>
    {
      return { ...state, areaOfStudyList };
    }),

    // AREA OF STUDY SELECTED
    on(setSelectedAreaOfStudy, (state, { areaOfStudy }) =>
    {
      return { ...state, selectedAreaOfStudy: areaOfStudy };
    }),

    // AREA OF STUDY RECEIVED
    on(areaOfStudyReceived, (state, { areaOfStudy }) =>
    {
      return { ...state, selectedAreaOfStudy: areaOfStudy };
    }),

    // CLEAR SELECTED AREA OF STUDY
    on(requestClearSelectedAreaOfStudy, (state) =>
    {
      return { ...state, selectedAreaOfStudy: undefined };
    }),


  );


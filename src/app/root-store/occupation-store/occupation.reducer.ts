import { createReducer, on } from '@ngrx/store';
import { initialOccupationState } from './occupation.state';
import { occupationDetailsReceived, requestClearSelectedOccupationModel, setSelectedPathwayFromPathwayDetails, setSelectedPathwayFromOccupationPathwayList, setSelectedPathwayFromAreaOfStudyOccupationList, setSelectedPathwayFromOccupationList, occupationPreviewReceived } from './occupation.actions';


export const reducer = createReducer(
  initialOccupationState,

  on(occupationDetailsReceived, (state, { occupationModel }) =>
  {
    return { ...state, occupationModel };
  }),

  on(occupationPreviewReceived, (state, { occupationPreview }) =>
  {
    return { ...state, occupationPreview };
  }),


  // SELECTED OCCUPATION CLEARED
  on(requestClearSelectedOccupationModel, (state) =>
  {
    return { ...state, occupationModel: undefined, selectedPathway: undefined };
  }),


  // SET SELECTED PATHWAY FOR OCCUPATION
  on(setSelectedPathwayFromAreaOfStudyOccupationList, (state, { pathway }) =>
  {
    return { ...state, selectedPathway: pathway };
  }),
  on(setSelectedPathwayFromOccupationList, (state, { pathway }) =>
  {
    return { ...state, selectedPathway: pathway };
  }),
  on(setSelectedPathwayFromPathwayDetails, (state, { pathway }) =>
  {
    return { ...state, selectedPathway: pathway };
  }),




  on(setSelectedPathwayFromOccupationPathwayList, (state, { pathway }) =>
  {
    return { ...state, selectedPathway: pathway };
  })

);

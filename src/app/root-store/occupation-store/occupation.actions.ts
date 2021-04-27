import { createAction, props } from '@ngrx/store';

import { Occupation, Pathway } from '@gql';


export const requestClearSelectedOccupationModel = createAction
  (
    '[Occupation] request clear selected occupation model'
  );

export const occupationCardsFailure = createAction
  (
    '[Occupation] Occupation Failure',
    props<{ error: any; }>()
  );

export const requestOccupationDetails = createAction
  (
    '[Occupation] request occupation details',
    props<{ occupationId: string; }>()
  );

export const occupationDetailsReceived = createAction
  (
    '[Occupation] occupation details received',
    props<{ occupationModel: Occupation; }>()
  );

export const occupationDetailsFailure = createAction
  (
    '[Occupation] occupation details error',
    props<{ error: any; }>()
  );


export const setSelectedPathwayFromAreaOfStudyOccupationList = createAction
  (
    '[Occupation] set selected pathway from area of study occupation list',
    props<{ pathway: Pathway; }>()
  );
export const setSelectedPathwayFromOccupationList = createAction
  (
    '[Occupation] set selected pathway from occupation list',
    props<{ pathway: Pathway; }>()
  );
export const setSelectedPathwayFromPathwayDetails = createAction
  (
    '[Occupation] set selected pathway from pathway details',
    props<{ pathway: Pathway; }>()
  );


export const setSelectedPathwayFromOccupationPathwayList = createAction
  (
    '[Occupation] set selected pathway from occupation pathway list',
    props<{ pathway: Pathway; }>()
  );


export const requestOccupationPreview = createAction
  (
    '[Occupation] request occupation preiew',
    props<{ occupationId: string; }>()
  );

export const occupationPreviewReceived = createAction
  (
    '[Occupation] occupation preview received',
    props<{ occupationPreview: Occupation; }>()
  );
